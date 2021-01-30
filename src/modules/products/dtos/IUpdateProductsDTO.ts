export default interface IUpdateProductsDTO {
  id: string;
  title?: string;
  type?: string;
  description?: string;
  filename?: string;
  height?: number;
  width?: number;
  price?: number;
  rating?: number;
}
