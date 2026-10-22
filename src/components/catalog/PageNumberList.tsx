import { listPageNumbers } from '../../utils/pagination';
import { PageNumberButton } from './PageNumberButton';
import styles from './PageNumberList.module.css';

interface PageNumberListProps {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}

export function PageNumberList({ page, pageCount, onPageChange }: PageNumberListProps) {
  return (
    <ul className={styles.pageNumbers}>
      {listPageNumbers(pageCount).map((pageNumber) => (
        <li key={pageNumber}>
          <PageNumberButton
            pageNumber={pageNumber}
            isCurrent={pageNumber === page}
            onClick={() => onPageChange(pageNumber)}
          />
        </li>
      ))}
    </ul>
  );
}
