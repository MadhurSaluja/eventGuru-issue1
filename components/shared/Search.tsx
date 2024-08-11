"use client"
import { useEffect, useState } from 'react'
import { Input } from '../ui/input';
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaMagnifyingGlass } from 'react-icons/fa6';

const Search = ({ placeholder = 'Search title...' }: { placeholder?: string }) => {
    const [query, setQuery] = useState('');
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            let newUrl = '';

            if (query) {
                newUrl = formUrlQuery({
                    params: searchParams.toString(),
                    key: 'query',
                    value: query
                })
            } else {
                newUrl = removeKeysFromQuery({
                    params: searchParams.toString(),
                    keysToRemove: ['query']
                })
            }

            router.push(newUrl, { scroll: false });
        }, 300)

        return () => clearTimeout(delayDebounceFn);
    }, [query, searchParams, router])

    return (
        <div className="flex-center min-h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2 flex items-center">
            <FaMagnifyingGlass className="text-grey-500" />
            <Input
                type="text"
                placeholder={placeholder}
                onChange={(e) => setQuery(e.target.value)}
                className="border-0 bg-grey-50 outline-offset-0 placeholder:text-grey-500"
            />
        </div>
    )
}

export default Search