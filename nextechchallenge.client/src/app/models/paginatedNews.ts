import { news } from './news';

export interface paginatedNews
{
    data : news[];
    totalItems : number;
    totalPages : number;
    currentPage: number;
}