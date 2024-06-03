import React, {ChangeEvent, FC, useCallback, useRef, useState} from 'react';
import debounce from "lodash.debounce"
import cls from '@src/features/search/Search.module.scss'
import CrossIcon from "@src/shared/assets/icons/header/cross.svg"
import {useClass} from "@src/shared/hooks";
import {TextModule} from "@src/shared/scss";

interface SearchProps {
    searchValue: string
    setSearchValue: (i: (string)) => void
    children: string
    className?: string
}

export const Search:FC<SearchProps> = (props) => {
    const {searchValue, setSearchValue, children, className} = props
    const [inputValue, setInputValue] = useState<string>(searchValue)
    const inputRef = useRef<HTMLInputElement>(null)

    const onClickClear = () => {
        setInputValue('')
        setSearchValue('')
        inputRef.current?.focus()
    }

    const changeSearchQuery = useCallback(
        debounce(val => {
            setSearchValue(val)
        }, 500)
        , []
    )

    const changeInput = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
        changeSearchQuery(event.target.value)
    }

    return (
        <div className={useClass([cls.searchContainer, className, TextModule.p_16])}>
            <input
                ref={inputRef}
                value={inputValue}
                onChange={changeInput}
                className={cls.input}
                placeholder={children}
            />
            {searchValue &&
                <div onClick={() => onClickClear()} className={cls.clearIcon}>
                    <CrossIcon/>
                </div>
            }
        </div>
    );

};