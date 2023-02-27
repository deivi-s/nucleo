import { MatPaginatorIntl } from '@angular/material/paginator';

export class Paginator extends MatPaginatorIntl {
  override itemsPerPageLabel = 'Items por página:';
  override nextPageLabel = 'SIGUIENTE PÁGINA';
  override previousPageLabel = 'PÁGINA ANTERIOR';
  override firstPageLabel = 'PRIMERA PÁGINA';
  override lastPageLabel = 'ÚLTIMA PÁGINA';

  override getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return `0 of ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex =
      startIndex < length
        ? Math.min(startIndex + pageSize, length)
        : startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} de ${length} registros`;
  };
}
