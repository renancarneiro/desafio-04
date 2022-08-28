import { Router } from 'express'
import ProductController from '../app/controller/ProductController'
import createValidation from '../app/validations/product/create-produto-validation'
import getValidation from '../app/validations/product/id-product-validation'
import updatePutValidation from '../app/validations/product/update-Put'
import updatePatchValidation from '../app/validations/product/update-Patch'

const router = Router()

router.post('/api/v1/product', createValidation, ProductController.createProduct)

router.get('/api/v1/product/:id', ProductController.findProductById)

router.get('/api/v1/product', getValidation, ProductController.findProduct)

router.get('/api/v1/product/low_stock', getValidation, ProductController.showLowStock)

router.delete('/api/v1/product/:id', ProductController.deleteProductById)

router.put('/api/v1/product/:id', updatePutValidation, ProductController.updateProduct)

router.patch('/api/v1/product/:id', updatePatchValidation, ProductController.updateProduct)


export default router
