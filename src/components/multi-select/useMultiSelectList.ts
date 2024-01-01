import { useCallback } from "react";

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

    const loadItems = useCallback(
        async ({ signal, cursor, filterText }: LoadItemsProps) => {
            try {
                const filterArray =
                    Array.isArray(filterParams) &&
                    filterParams.length > 0 &&
                    filterText?.length > 0
                        ? filterParams.map(prm => `${prm}=${filterText}`)
                        : [];
                const searchParams =
                    filterArray.length > 0 ? `?${filterArray.join("&")}` : "";
                let apiUrl = cursor || `${url}${searchParams}`;
                if (cursor) {
                    apiUrl = apiUrl.replace(/^http:\/\//i, "https://");
                }
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
                    return {
                        items: get(json, apiResultPath) as T[],
                        cursor: get(json, apiResultCursor),
                    };
                } else {
                    throw new Error(json?.error || "Something gone wrong");
                }
            } catch (error) {
                throw new Error(error as string);
            }
        },
        [apiResultCursor, apiResultPath, filterParams, url]
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
