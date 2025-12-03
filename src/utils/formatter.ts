/**
 * 날짜 문자열을 로컬 날짜 형식으로 변환합니다.
 * @param dateString - ISO 날짜 문자열
 * @returns 포맷팅된 날짜 문자열 (예: "2024/1/1")
 */
export function formatCreatedAt(dateString: string | undefined): string {
  if (!dateString) return '';
  
  try {
    return new Date(dateString).toLocaleDateString();
  } catch {
    return String(dateString);
  }
}

/**
 * 숫자를 통화 형식으로 변환합니다.
 * @param price - 숫자 금액
 * @returns 포맷팅된 가격 문자열 (예: "1,000")
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('ko-KR').format(price);
}
