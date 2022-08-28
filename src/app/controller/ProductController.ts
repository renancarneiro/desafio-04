import { Request, Response } from 'express'

import DuplicateKeyError from '../errors/DuplicateKeyError'
import ProductService from '../service/ProductService'
import { IProduct, IQueryGet } from '../interfaces/IProduct'

class ProductController {
  public async createProduct (req: Request, res: Response): Promise<Response> {
    try {
      const body = req.body
      const result = await ProductService.createProduct(body)
      return res.status(201).json(result)

    } catch (error) {
      if (error.code === 11000) {
        const nameError = Object.keys(error.keyValue)
        return res.status(400).json(DuplicateKeyError(nameError))
      }

      return res.status(500).json({ error })
    }
  }

  public async findProduct (req: Request<{}, {}, {}, IQueryGet>, res: Response): Promise<Response> {
    try {
      const { page, limit, ...query } = req.query
      const result = await ProductService.findProduct(query, page || 1, limit || 50)
      return res.status(200).json(result)

    } catch (error) {
      if (error.statusCode) {
        return res.status(error.statusCode).json({
          message: error.name,
          details: error.message
        })
      }

      return res.status(500).json({ error })
    }
  }

  public async updateProduct (req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params
      const body = req.body
      const resuly = await ProductService.updateProduct(id, body)

      return res.status(200).json(resuly)
    } catch (error) {
      if (error.statusCode) {
        return res.status(error.statusCode).json({
          message: error.name,
          details: error.message
        })
      }

      return res.status(500).json({ error })
    }
  }

  public async deleteProductById (req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params
      const result = await ProductService.deleteProductById(id)
      return res.status(204).json(result)

    } catch (error) {
      if (error.statusCode) {
        return res.status(error.statusCode).json({
          message: error.name,
          details: error.message
        })
      }

      return res.status(500).json({ error })
    }
  }

  public async findProductById (req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params
      const result = await ProductService.getById(id)
      return res.status(200).json(result)

    } catch (error) {
      if (error.statusCode) {
        return res.status(error.statusCode)
      }

      return res.status(500).json({ error })
    }
  }

  public async showLowStock (req: Request<{}, {}, {}, IQueryGet>, res: Response): Promise<Response> {
    try {
      const { page, limit } = req.query
      const result = await ProductService.showLowStock(page || 1, limit || 50)
      return res.status(200).json(result)

    } catch (error) {
      if (error.statusCode) {
        return res.status(error.statusCode).json({
          message: error.name,
          details: error.message
        })
      }

      return res.status(500).json({ error })
    }
  }

}

export default new ProductController()
