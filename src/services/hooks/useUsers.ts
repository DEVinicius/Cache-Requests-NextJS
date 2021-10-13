import { useQuery } from "react-query";
import { User } from "../../dto/user.dto";
import { localApi } from "../axios/localApi";

type GetUsersResponse = {
    totalCount: number;
    users: User[]
}

export async function getUsers(page:number): Promise<GetUsersResponse> {
    const { data, headers} = await localApi.get("/users", {
        params: {
            page    
        }
    });

    const totalCount = Number(headers['x-total-count']);
    
    const users = data.users.map(user => {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: new Date(user.createdAt).toLocaleDateString("pt-BR", {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            })
        }
    });

    return {
        totalCount, 
        users
    };
}

export function useUsers(page:number) {
    return useQuery(['users', page], () => getUsers(page), {
        staleTime: 1000 * 5
    });
}