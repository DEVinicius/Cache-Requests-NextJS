import { Button } from '@chakra-ui/button';
import { Text } from '@chakra-ui/layout';

interface IPaginationItem {
    isCurrently ?: boolean;
    pageNumber: number;
    onPageChange: (pageNumber: number) => void;
}

export function PaginationItem({
    pageNumber,
    isCurrently = false,
    onPageChange
}:IPaginationItem) {
    return (
        <Button 
            background={isCurrently ? "red.500" : "gray.600"}
            onClick={() =>{
                onPageChange(pageNumber)
            }}>
            <Text
                fontSize="3xl"
                fontWeight="bold"
            >
                {pageNumber}
            </Text>
        </Button>
    );
}