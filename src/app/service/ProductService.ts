import { PaginateResult, Types } from 'mongoose'

import { IProductResponse, IProduct, IQueryGet } from '../interfaces/IProduct'
import ProductRepository from '../repository/ProductRepository'
import BadRequestError from '../errors/BadRequestError'
import NotFoundError from '../errors/NotFoundError'

class ProductService {
  public async createProduct (payload: any): Promise<IProductResponse> {
    const result = await ProductRepository.create(payload)

    return result
  }

  public async getById (id: string): Promise<IProductResponse> {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestError('Id not valid')

    const result = await ProductRepository.getById(id)

    if (!result) throw new NotFoundError('Not found product')

    return result
  }

  public async findProduct (payload: IQueryGet, page: number, limit: number): Promise<PaginateResult<IProductResponse>> {
    const result = await ProductRepository.get(payload, page, limit)

    if (result.totalCount === 0) throw new NotFoundError('Not found products')
    if (Number(result.currentPage) > result.totalPages) throw new NotFoundError('Not found products')

    return result
  }

  public async updateProduct (id: string, payload: IProduct): Promise<IProductResponse> {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestError('Id not valid')

    if (payload.qtd_stock === 0) payload.stock_control_enabled = false
    if (payload.qtd_stock !== 0) payload.stock_control_enabled = true

    const result = await ProductRepository.update(id, payload)

    if (!result) throw new NotFoundError('Not found product')

    return result
  }

  public async deleteProductById (id: string): Promise<IProductResponse> {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestError('Id not valid')

    const result = await ProductRepository.delete(id)

    if (!result) throw new NotFoundError('Not found product')

    return result
  }

  public async showLowStock (page: number, limit: number): Promise<PaginateResult<IProductResponse>> {
    const payload = { qtd_stock: { $lt: 100 } }
    const result = await ProductRepository.get(payload, page, limit)

    if (result.totalCount === 0) throw new NotFoundError('Not found products')
    if (Number(result.currentPage) > result.totalPages) throw new NotFoundError('Not found products')

    return result
  }
}

export default new ProductService()
