import { Flex } from "@chakra-ui/layout";
import { Spinner, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { NextComponentType } from "next";
import React, { useCallback, useState } from "react";
import { Pagination } from "./Pagination";
import { useUsers } from "../services/hooks/useUsers";

export const UserList: NextComponentType = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const { data, isLoading, error } = useUsers(currentPage);


    const handleChangePagination = useCallback(async(number: number) => {
        setCurrentPage(number);
    }, [currentPage, setCurrentPage]);

    return (
        <Flex
            width="100vw"
            height="100vh"
            background="gray.800"
            color="white"
            flexDirection="column"
            alignItems="center"
        >
            {
                isLoading ? (
                    <Flex
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Spinner />
                    </Flex>
                ) : error ? (
                    <h1>ERROR</h1>
                ) : (
                    <Flex
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        height="100%"
                        width="40%"
                    >
                        <Table
                            marginBottom="2rem"
                        >
                            <Thead>
                                <Tr>
                                    <Th>Usuário</Th>
                                    <Th>Data de Criação</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {
                                    data && data.users.map(user => (
                                        <Tr key={user.id}>
                                            <Td>
                                                <Flex
                                                    flexDirection="column"
                                                    justifyContent="center"
                                                    alignItems="flex-start"
                                                >
                                                    <Text
                                                        fontSize="2xl"
                                                        fontWeight="bold"
                                                    >
                                                        {user.name}
                                                    </Text>
                                                    <Text>
                                                        {user.email}
                                                    </Text>
                                                </Flex>
                                            </Td>
                                            <Td>
                                                {user.createdAt}
                                            </Td>
                                        </Tr>
                                    ))
                                }
                            </Tbody>
                        </Table>
                        <Pagination 
                            currentPage={currentPage}
                            handleChangePagination={handleChangePagination}
                            lastItem={30}
                            maxItems={data ? data.totalCount : 1}
                            perPage={10}
                        />
                    </Flex>
                )
            }
            
        </Flex>
    );
}
