import { useCallback } from "react";

import debounce from "lodash/debounce";
import get from "lodash/get";
import has from "lodash/has";
import { type AsyncListOptions, useAsyncList } from "react-stately";

interface LoadItemsProps {
    signal: AbortSignal;
    cursor?: string;
    filterText: string;
}
interface UseMultiSelectListProps {
    url?: string;
    filterParams?: string[];
    apiResultPath?: string;
    apiResultCursor?: string;
}
const useMultiSelectList = <T>(props: UseMultiSelectListProps) => {
    const {
        url,
        filterParams = ["name"],
        apiResultPath = "results",
        apiResultCursor = "info.next",
    } = props || {};
    const debouncedLoadItems = useCallback(
        ({ signal, cursor, filterText }: LoadItemsProps) => {
            /**
             * Debounce for less network request
             * Debouncing with setFilterText would be better approach if we would not use controlled pattern
             */
            return new Promise((resolve, reject) => {
                try {
                    const filterArray =
                        Array.isArray(filterParams) &&
                        filterParams.length > 0 &&
                        filterText?.length > 0
                            ? filterParams.map(prm => `${prm}=${filterText}`)
                            : [];
                    const searchParams =
                        filterArray.length > 0
                            ? `?${filterArray.join("&")}`
                            : "";
                    let apiUrl = cursor || `${url}${searchParams}`;
                    if (cursor) {
                        apiUrl = apiUrl.replace(/^http:\/\//i, "https://");
                    }
                    const fetchData = async () => {
                        /**
                         * Simple cache mechanism for improve network performance
                         */
                        const res = await fetch(apiUrl, {
                            signal,
                            cache: "force-cache",
                            headers: {
                                "Cache-Control": "max-age=3600",
                            },
                        });
                        const json = await res.json();
                        /**
                         * make more dynamic for another endpoints
                         */
                        if (has(json, "results")) {
                            resolve({
                                items: get(json, apiResultPath) as T[],
                                cursor: get(json, apiResultCursor),
                            });
                        } else {
                            reject(json?.error || "Something gone wrong");
                        }
                    };

                    const debouncedFetchData = debounce(fetchData, 300);
                    debouncedFetchData();
                } catch (error) {
                    reject(error);
                }
            });
        },
        [apiResultCursor, apiResultPath, filterParams, url]
    );

    const loadItems = useCallback(
        async (args: LoadItemsProps) => {
            try {
                return await debouncedLoadItems(args);
            } catch (error) {
                throw new Error(error as string);
            }
        },
        [debouncedLoadItems]
    );

    const {
        error,
        filterText,
        isLoading,
        items,
        loadMore,
        selectedKeys,
        setFilterText,
        setSelectedKeys,
    } = useAsyncList<T>({
        load: loadItems as AsyncListOptions<T, string>["load"],
    });
    return {
        error,
        filterText,
        isLoading,
        items,
        loadMore,
        selectedKeys,
        setFilterText,
        setSelectedKeys,
    };
};

export default useMultiSelectList;
