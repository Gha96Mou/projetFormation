import { AbstractController } from "@formation/servers-lib/dist/utils";
import { Body, Controller, Get, Param, Post, Put, Query, Delete} from "@nestjs/common";
import { ProductsService } from "./products.service";
import { LoggerService } from '@formation/servers-lib/dist/services'
import { ProductSearchResultDto, WorkDone } from "@formation/shared-lib";



@Controller ('products')
export class ProductsController extends AbstractController {

  constructor (
    private readonly logger: LoggerService,
    private readonly productsService: ProductsService
  ) {
    super()
    this.logger.info('ProductsController created')
  }

  // Get all products 
  @Get('')
  async fetchAllProducts(): Promise<WorkDone<ProductSearchResultDto[]>> {
    return this.productsService.fetchAllProducts();
  }
  
  // Get a product by its code
  @Get(':code')
  async findOne (@Param('code') code: string): Promise<WorkDone<ProductSearchResultDto>> {
    return this.productsService.findOne(code);
  }









  

  // Create a product
  @Post('')
  async createProduct(@Body() productData: {
    code: string;
    libelle: string;
    commentaires?: string;
    Offres: number; // Add the 'offres' property
  }): Promise<WorkDone<ProductSearchResultDto>> {
    return this.productsService.createProduct(productData);
  }


















  // Update a product
  @Put(':code')
  async updateProduct(@Param('code') code: string, @Body() updatedData: {
    libelle?: string;
    commentaires?: string;
  }): Promise<WorkDone<ProductSearchResultDto>> {
    return this.productsService.updateProduct(code, updatedData);
  }















  // Delete a product
  @Delete(':code')
      async deleteProduct(@Param('code') code: string): Promise<WorkDone<void>> {
        return this.productsService.deleteProduct(code);
      }


@Get('/search/:libelle')
async searchProductByLibelle(@Query('libelle') libelle: string, @Query('code') code: string): Promise<WorkDone<ProductSearchResultDto[]>> {
  const searchCriteria: ProductSearchResultDto = {
    libelle,
    code: code ? code : "",
    Offres: 0
  };
        
    return this.productsService.findMany(searchCriteria);
    }
}
/*
  @Get('/search/multi-criterias')
  async searchProduct(@Query() queryParams:ISearchDto <SearchProductDto>):Promise<WorkDone<IPaginatedListDto<ProductSearchResultDto>>> {
    const criterias = ProductsController.parseSearchDtoFromQuery<SearchProductDto>(queryParams);
    this.logger.debug(JSON.stringify(criterias))
    return this.productsService.searchProduct(criterias)
  }

*/


 



