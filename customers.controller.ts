import { LoggerService } from '@formation/servers-lib/dist/services'
import { AbstractController } from '@formation/servers-lib/dist/utils'
import {
  CustomerSearchResultDto,
  IPaginatedListDto,
  ISearchDto,
  SearchCustomerDto,
  WorkDone
} from '@formation/shared-lib'
import {
  Controller,
  Get,
  Query
} from '@nestjs/common'
import { CustomersService } from './customers.service'

@Controller('customers')
export class CustomersController extends AbstractController {

  constructor (
    private readonly logger: LoggerService,
    private readonly customersService: CustomersService
  ) {
    super()
    this.logger.info('CustomersController created')
  }

/*

  @Get('')
  async fetchAllCustomers(): Promise<WorkDone<CustomerSearchResultDto[]>> {
    return this.customersService.fetchAllCustomers()
  }








  @Get('/search/one')
  async findOne (@Query('codeFichierPartenaire') codeFichierPartenaire: string, @Query('chronoClient') chronoClient: string): Promise<WorkDone<CustomerSearchResultDto>> {
    return this.customersService.findOne(codeFichierPartenaire, chronoClient)
  }


*/



/*

  @Get('/search/multi-criterias')
  async searchCustomer (@Query() queryParams: ISearchDto<SearchCustomerDto>): Promise<WorkDone<IPaginatedListDto<CustomerSearchResultDto>>> {
    const criterias = CustomersController.parseSearchDtoFromQuery<SearchCustomerDto>(queryParams)
    this.logger.debug(JSON.stringify(criterias))
    return this.customersService.searchCustomer(criterias)
  }

*/

/*


  @Get('/search/multi-criterias')
  async searchCustomer(@Query() queryParams: ISearchDto<SearchCustomerDto>): Promise<WorkDone<IPaginatedListDto<CustomerSearchResultDto>>> {
      try {
          const result = await this.customersService.searchCustomer(queryParams);
          return result;
      } catch (error) {
          // Handle errors appropriately
          return { isOk: false, error: error.message };
      }
  }
  

*/


@Get('/search/one')
async findOne (@Query('codeFichierPartenaire') codeFichierPartenaire: string, @Query('chronoClient') chronoClient: string): Promise<WorkDone<CustomerSearchResultDto>> {
  return this.customersService.findOne(codeFichierPartenaire, chronoClient)
}

@Get('/search/multi-criterias')
async searchCustomer (@Query() queryParams: ISearchDto<SearchCustomerDto>): Promise<WorkDone<IPaginatedListDto<CustomerSearchResultDto>>> {
  const criterias = CustomersController.parseSearchDtoFromQuery<SearchCustomerDto>(queryParams)
  this.logger.debug(JSON.stringify(criterias))
  return this.customersService.searchCustomer(criterias)
}
}
