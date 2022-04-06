import React, { useCallback, useState } from "react";
import debounce from "lodash/debounce";
import { Game } from "./../models/game";
import { searchGamesApi } from "./../services/apiServices";

const withSearchGames = <T extends unknown>(C: React.ComponentType<T>) => {
    const Wrapper = (props: T) => {
        let [keyword, setKeyword] = useState("");
        let [isLoadingSearch, setIsLoadingSearch] = useState(false);
        let [searchResult, setSearchResult] = useState<Game[]>([]);

        function onChangeKeyword(value: string): void {
            // setKeyword(value);
            searchGames(value)
        }

        const debouncedChangeKeyword = useCallback(
            debounce(onChangeKeyword, 300),
            []
        );

        async function searchGames(keyword: string) {
            try {
                setIsLoadingSearch(true);
                let { data } = await searchGamesApi({ keyword });
                console.log(data);
                setSearchResult(data);
                setIsLoadingSearch(false);
            } catch (error) {
                setIsLoadingSearch(false);
            }
        }

        return (
            <C
                {...(props as T)}
                keyword={keyword}
                isLoadingSearch={isLoadingSearch}
                searchResult={searchResult}
                onChangeKeyword={debouncedChangeKeyword}
            />
        );
    };
    return Wrapper;
};

export default withSearchGames;
