import {
    MdKeyboardArrowLeft,
    MdKeyboardArrowRight,
    MdKeyboardDoubleArrowLeft,
    MdKeyboardDoubleArrowRight,
} from 'react-icons/md';

import { DOTS, usePagination } from '../../hooks/usePagination.hook';
import {
    ActionButton,
    ActionButtonsContainer,
    PageNumber,
    PageNumberContainer,
    PaginationContainer,
} from './pagination.styles';

export type BackendSupportedPaginationProps = {
    totalCount: number;
    pageSize: number;
    siblingCount: number;
    currentPage: number;
    onPageChange: (page: number) => void;
    onPageHover: (page: number) => void;
};

export const BackendSupportedPagination = ({
    totalCount,
    pageSize,
    siblingCount = 1,
    currentPage,
    onPageChange,
    onPageHover,
}: BackendSupportedPaginationProps) => {
    // should be props

    const paginationRange = usePagination({
        totalCount,
        pageSize,
        siblingCount,
        currentPage,
    });

    if (currentPage === 0 || Number(paginationRange?.length) < 2) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    const lastPage = paginationRange?.[paginationRange.length - 1] || 0;

    return (
        <PaginationContainer>
            <ActionButtonsContainer>
                <ActionButton disabled={currentPage === 1}>
                    <MdKeyboardDoubleArrowLeft />
                </ActionButton>

                <ActionButton disabled={currentPage === 1} onClick={onPrevious}>
                    <MdKeyboardArrowLeft />
                </ActionButton>
            </ActionButtonsContainer>

            <PageNumberContainer>
                {paginationRange &&
                    paginationRange.map((pageNumber, index) => {
                        if (pageNumber === DOTS) {
                            return <PageNumber key={index}>&#8230;</PageNumber>;
                        }
                        return (
                            <PageNumber
                                onClick={() => onPageChange(+pageNumber)}
                                onMouseEnter={() => onPageHover(+pageNumber)}
                                key={index}
                                active={pageNumber === currentPage}
                            >
                                {pageNumber}
                            </PageNumber>
                        );
                    })}
            </PageNumberContainer>
            <ActionButtonsContainer>
                <ActionButton
                    disabled={currentPage === lastPage}
                    onClick={onNext}
                >
                    <MdKeyboardArrowRight />
                </ActionButton>
                <ActionButton disabled={currentPage === lastPage}>
                    <MdKeyboardDoubleArrowRight />
                </ActionButton>
            </ActionButtonsContainer>
        </PaginationContainer>
    );
};

export default BackendSupportedPagination;
