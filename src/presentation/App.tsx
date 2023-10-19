import { useEffect, useState } from "react";

import useLocalStorage from "@application/hooks/useLocalStorage";
import { TOption } from "@domain/options.dto";
import service from "@infrastructure/api/service";
import { useInfiniteQuery } from "@tanstack/react-query";

import MultiselectInput from "./components/MultiSelectInput";

const App = () => {
  const limit = 10;
  const [hasToPrefetch, setHasToPrefetch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedOptions, setSelectedOptions] = useLocalStorage<TOption[]>(
    "selectedOptions",
    []
  );

  const {
    data,
    error,
    isError,
    isLoading,
    isSuccess,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery<TOption[], Error>({
    queryKey: ["options", searchQuery],
    queryFn: ({ pageParam = 1 }: { pageParam?: number }) => service.getOptions({
        page: pageParam,
        query: searchQuery,
      }),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage =        lastPage.length === limit ? allPages.length + 1 : undefined;
      return nextPage;
    },
    /* select: (data) => ({
      pages: [...data.pages].reverse(),
    }),
    */
  });

  useEffect(() => {
    if (hasToPrefetch && hasNextPage) {
      fetchNextPage()
        .then(() => {})
        .catch(() => {});
    }
  }, [hasToPrefetch, fetchNextPage, hasNextPage]);

  return (
    <div className="container my-8 max-w-screen-lg">
      <MultiselectInput
        label="Kategoriler"
        placeHolder="Katgegori ara"
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        errorMessage={isError ? error.message : undefined}
        isLoading={isLoading || isFetchingNextPage}
        data={isSuccess ? data.pages.flat() : []}
        inViewHandler={setHasToPrefetch}
      />
    </div>
  );
};
export default App;
