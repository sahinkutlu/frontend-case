import { useCallback, useState } from "react";

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
    /**
     * Error state
     */
    const [errorMessage, setErrorMessage] = useState<string>("");
    /**
     * Fetch items with params
     */
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
                    setErrorMessage("");
                    return {
                        items: get(json, apiResultPath) as T[],
                        cursor: get(json, apiResultCursor),
                    };
                } else {
                    throw new Error(
                        get(json, "error", "Something went wrong B1")
                    );
                }
            } catch (error) {
                const eMessage = get(
                    error,
                    "message",
                    "Something went wrong B2"
                );
                setErrorMessage(eMessage);
                throw new Error(error as string);
            }
        },
        [apiResultCursor, apiResultPath, filterParams, url]
    );

    const {
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
        errorMessage,
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
