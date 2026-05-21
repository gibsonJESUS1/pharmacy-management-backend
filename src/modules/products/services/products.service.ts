import { Injectable } from "@nestjs/common";

import { CreateProductDto } from "../dto/create-product.dto";

import { UpdateProductDto } from "../dto/update-product.dto";

import { ProductsRepository } from "../repositories/products.repository";
import { CACHE_MANAGER } from "@nestjs/cache-manager";

import { Inject } from "@nestjs/common";

import { Cache } from "cache-manager";

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  create(data: CreateProductDto) {
    return this.productsRepository.create(data);
  }

  findAll(query: any) {
    return this.productsRepository.findAll(query);
  }
  findOne(id: string) {
    return this.productsRepository.findOne(id);
  }

  update(id: string, data: UpdateProductDto) {
    return this.productsRepository.update(id, data);
  }

  remove(id: string) {
    return this.productsRepository.remove(id);
  }
}
