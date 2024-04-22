import {
  LoggerService,
  PrismaService
} from '@formation/servers-lib/dist/services'
import {
  CustomerSearchResultDto,
  IPaginatedListDto,
  ISearchDto,
  SearchCustomerDto,
  WorkDone
} from '@formation/shared-lib'
import { Injectable } from '@nestjs/common'

@Injectable()
export class CustomersService {

  constructor (
    private readonly logger: LoggerService,
    private readonly prismaService: PrismaService,
  ) {
    this.logger.info('CustomersService created')
  }




  

/*
async fetchAllCustomers(): Promise<WorkDone<CustomerSearchResultDto[]>> {
  const customers = await this.prismaService.customer.findMany();
  return { isOk: true, data: customers };
}






/*


  async findOne (codeFichierPartenaire: string, chronoClient: string): Promise<WorkDone<CustomerSearchResultDto>> {

    const customer = await this.prismaService.customer.findUnique({
      where: {
        codeFichierPartenaire: codeFichierPartenaire,
        chronoClient: chronoClient
      }
    });
return { isOk: true, data: customer };    
  }







 async searchCustomer(searchDto: ISearchDto<SearchCustomerDto>): Promise<WorkDone<IPaginatedListDto<CustomerSearchResultDto>>> {
    try {
        const { criterias, pagination } = searchDto;
        const { codeFichierPartenaire, chronoClient, nom, prenom, codePostal, ville, dateDerniereCommandeFrom, dateDerniereCommandeTo } = criterias;
        
        const customers = await this.prismaService.customer.findMany({
            where: {
                codeFichierPartenaire: { contains: codeFichierPartenaire },
                chronoClient: { contains: chronoClient },
                nom: { startsWith: nom },
                prenom: { startsWith: prenom },
                codePostal: { startsWith: codePostal },
                ville: { startsWith: ville },
                dateDerniereCommande: {
                    gte: dateDerniereCommandeFrom, // Greater than or equal to the from date
                    lte: dateDerniereCommandeTo,   // Less than or equal to the to date
                }
            },
            orderBy: {
                nom: 'asc' // You can change this based on your sorting preference
            },
            skip: (pagination.page - 1) * pagination.rowsPerPage,
            take: pagination.rowsPerPage
        });

        const totalCount = await this.prismaService.customer.count({
            where: {
                codeFichierPartenaire: { contains: codeFichierPartenaire },
                chronoClient: { contains: chronoClient },
                nom: { startsWith: nom },
                prenom: { startsWith: prenom },
                codePostal: { startsWith: codePostal },
                ville: { startsWith: ville },
                dateDerniereCommande: {
                    gte: dateDerniereCommandeFrom,
                    lte: dateDerniereCommandeTo,
                }
            }
        });

        const paginatedList: IPaginatedListDto<CustomerSearchResultDto> = {
            list: customers,
            rowsNumber: totalCount,
        };

        return { isOk: true, data: paginatedList };
    } catch (error) {
        return { isOk: false, error: error.message };
    }
}






*/

async findOne (codeFichierPartenaire: string, chronoClient: string): Promise<WorkDone<CustomerSearchResultDto>> {

  // add logic here !!

  return WorkDone.buildOk(
    {
      codeFichierPartenaire: '001',
      chronoClient: '11111111',
      nom: 'Doe',
      prenom: 'John',
      codePostal: '34130',
      ville: 'Mauguio',
      dateDerniereCommande: null
    }
  )
}

async searchCustomer (searchDto: ISearchDto<SearchCustomerDto>): Promise<WorkDone<IPaginatedListDto<CustomerSearchResultDto>>> {

  // add logic here !!

  return WorkDone.buildOk({
    rowsNumber: 2, list: [
      {
        codeFichierPartenaire: '001',
        chronoClient: '11111111',
        nom: 'Doe',
        prenom: 'John',
        codePostal: '34130',
        ville: 'Mauguio',
        dateDerniereCommande: new Date()
      },
      {
        codeFichierPartenaire: '001',
        chronoClient: '22222222',
        nom: 'Durand',
        prenom: 'Michel',
        codePostal: '34000',
        ville: 'Montpellier',
        dateDerniereCommande: new Date()
      }
    ]
  })
}
}

