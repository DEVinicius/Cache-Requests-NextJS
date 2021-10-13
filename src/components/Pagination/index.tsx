import { Flex, Text } from '@chakra-ui/layout';
import React from 'react';
import { PaginationItem } from './PaginationItem';

interface IPagination {
    maxItems: number;
    currentPage: number;
    lastItem: number;
    perPage: number;
    handleChangePagination: (pageNumber: number) => void;
}

const siblingsCount = 1;

function generatePagination(from: number, to:number) {
    return [... new Array(to - from)]
    .map((_,index) => {
        return from + index + 1;
    })
    .filter(page => page > 0)
}

export function Pagination({
    currentPage,
    lastItem,
    maxItems,
    perPage,
    handleChangePagination
}:IPagination) {
    const lastPage = Math.floor(maxItems/perPage);    

    const previousPages = currentPage > 1 ? generatePagination(currentPage - 1 - siblingsCount, currentPage -1): [];
    const nextPages = currentPage < lastPage ? generatePagination(currentPage, Math.min(currentPage + siblingsCount, lastPage)): [];

    return (
        <Flex>
            <div>
                <h3>Total de Produtos {maxItems} </h3>
            </div>
            <Flex
                flexDirection="row"
                alignItems="flex-end"
            >
                {currentPage  > ( 1 + siblingsCount) && (
                    <>
                        <PaginationItem 
                            pageNumber={1}
                            onPageChange={handleChangePagination}
                        />
                        <Text
                            padding="0 1rem"
                        >
                            ...
                        </Text>
                    </>
                )}

                {
                    previousPages.length > 0 && previousPages.map(page => (
                        <PaginationItem 
                            key={page}
                            pageNumber={page}
                            onPageChange={handleChangePagination}

                        />
                    ))
                }
                <PaginationItem 
                    pageNumber={currentPage}
                    isCurrently={true}
                    onPageChange={handleChangePagination}

                />

                {
                    nextPages.length > 0 && nextPages.map(page => (
                        <PaginationItem 
                            key={page}
                            pageNumber={page}
                            onPageChange={handleChangePagination}

                        />
                    ))
                }

                {currentPage  < ( lastPage - siblingsCount) && (
                    <>
                        <Text
                            padding="0 1rem"
                        >
                            ...
                        </Text>
                        
                        <PaginationItem 
                            pageNumber={lastPage}
                            onPageChange={handleChangePagination}

                        />
                    </>
                )}
            </Flex>
        </Flex>
    );
}