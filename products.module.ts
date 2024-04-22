import { ServersLibModule } from "@formation/servers-lib";
import { Module } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductsController } from "./products.controller";


@Module ({
  imports: [ServersLibModule,],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: []
})

export class ProductsModule { }
