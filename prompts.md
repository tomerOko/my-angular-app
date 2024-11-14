write me a complete project, something like notes manager or a shoping cart application. start with a reaq.md file explainig the bussiness logic, then the technical side.


technologies:
client: angular, rxjs
orchastration: kubernetes (on docker desktop)
infra: terraform
back end services: nest.js, rxjs
queue system: rabbit mq
analytics monitoring and logs: ELK Stack enhanced with Beats and Elastic APM


analytics and monitoring rquirements:
analytics (how many users failing and succeeding to signup every day for example, etc..),
resources monitoring (how many cpu's are used in my kubernetes cluster and databases response time, etc..)
log management (i want to be able to follow a complete flow across my kuberentes cluster from the http request through mutliple services all the way to http response, etc..)
notifications (like slack message or a whatsapp notification if some services is down, etc..) 


Backend Conventions:

Owned by Gal Mosaee

Last updated: Oct 30, 2024
14 min read

6 people viewed
Glossary section (DTO, DM, Model, transformer, controller…)

Models
The project should work with some common models types:

DTO (Data Transfer Object): An object that transferred between micro-services. The DTO should be separated into template, requests and response DTOs (While requests and response DTOs should be derived from the template DTO). DTOs need be wrap with class validator for validation in order to validate that data sent to an endpoint is valid.

DM (Data Model): An object that all the business logic should work with before it stored in the database as a model or returned by the endpoint as a DTO.

Model: An object as it should be store on databases. Databases like SQL and MongoDB have ORM solutions that help us map the data before it stored in the databases.

Interface: An interface that used to set valid parameters for functions.

Layers and Additional Components
In order to easily maintain the services and design them to be flexible as possible, we are using multi layers structure in our projects. The layers follow some clear and independent rules that help us designing the project. Here are the main entities in the multi layers structure:

Controller
Description
The Controller acts as the entry point to the application’s backend, listening to incoming HTTP/S requests or queue messages and initiating the corresponding backend logic. It handles routing and request validation while delegating main business logic to other layers to remain lean and focused on managing the request lifecycle.

Usages
The Controller receives and interprets incoming requests, triggering the appropriate backend processes.

It performs initial DTO validations before proceeding with request handling.

Guidelines
Lean Structure: Keep controllers as streamlined as possible, focusing on routing, request validation, and delegating logic to the provider.

DTO-Only Operations: Controllers should only work with DTOs.

Validation: Ensure all incoming DTOs are validated at the controller level before passing them along, maintaining data integrity and security.

Request-Specific Actions: Handle actions related to the request object, such as extracting user details and headers.

Examples


// entities1.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { CreationEntity1Dto } from '../models/dtos/creation-entity1.dto';
import { Entities1Provider } from '../providers/entities1.provider';
import { Entity1ResponseDto } from '../models/dtos/entity1-response.dto';
@ApiTags('Entities1')
@Controller('entities1')
export class Entities1Controller {
  constructor(private readonly entities1Provider: Entities1Provider) {}
  @Post()
  public async createEntity1(@Body() creationEntity1Dto: CreationEntity1Dto): Promise<Entity1ResponseDto> {
    return await this.entities1Provider.createEntity1(creationEntity1Dto);
  }
}
Diagrams
Open Backend Layers-Controller.drawio.png
Backend Layers-Controller.drawio.png
Diagram shows the controller's relationship with other layers.
Provider
Description
The Provider layer is responsible for managing request handling from the point it passes through the controller to the point it returns a response to the controller. It orchestrates the business logic by aggregating multiple functionalities, making it the primary layer for complex logic and error handling within the application.

Usages
The Provider is the entry point for handling business logic, aggregating multiple service functions and other resources as needed to fulfill a request.

It handles and manages errors specific to the business requirements, ensuring appropriate responses.

Guidelines
Request Handling: The provider receives a DTO from the controller, transforms it into a DM, and performs necessary operations before transforming the results back into a response DTO for the controller.

Business Logic: Ensure that the provider consolidates multiple service functions to implement business logic. Avoid embedding detailed logic in services, keeping it centralized within the provider layer.

Error Management: Handle all business-specific error logic within the provider.

Data Transformation: Use transformations to convert DTOs to DMs before applying business logic and back to DTOs for response, ensuring the data formats align with the application's requirements.

Examples


// entities1.provider.ts
import { Injectable } from '@nestjs/common';
import { CreationEntity1Dto } from '../models/dtos/creation-entity1.dto';
import { Entities1Service } from '../services/entities1.service';
import { Entity1ResponseDto } from '../models/dtos/entity1-response.dto';
import { Entity1Dm } from '../models/dms/entity1.dm';
import { Entities1Transformer } from '../transformers/entities1.transformer';
@Injectable()
export class Entities1Provider {
  constructor(private readonly entities1Service: Entities1Service) {}
  public async createEntity1(creationEntity1Dto: CreationEntity1Dto): Promise<Entity1ResponseDto> {
    try {
      const entity1Dm: Entity1Dm = Entities1Transformer.transformCreationEntity1DtoToEntity1Dm(creationEntity1Dto);
      const newEntity1Dm: Entity1Dm = await this.entities1Service.createEntity1(entity1Dm);
      return Entities1Transformer.transformCreationEntity1DmToEntity1Dto(newEntity1Dm);
    } catch (error) {
      // Handle error as needed and throw an exception if needed.
    }
  }
}
Diagrams
Open Backend Layers-Provider.drawio.png
Backend Layers-Provider.drawio.png
Diagram shows the provider's relationship with other layers.
Service
Description
The Service layer is responsible for handling basic functionalities, such as CRUD (Create, Read, Update, Delete) operations. It provides functions for these operations, which providers can use to build more complex logic. By focusing on simple, reusable functions, the Service layer enhances modularity and maintainability.

Usages
Providers utilize service functions to perform basic CRUD tasks.

Service functions can be combined or called by providers to implement complex logic.

Guidelines
Simplicity: Keep functions as straightforward as possible, focusing on single responsibilities. Avoid embedding complex logic within service functions to maintain reusability.

Error Handling: Services can handle generic errors but should leave provider-specific error handling to the providers.

Data Transformation: Services receive data in the form of DM from the provider, transform them as necessary (for example, convert DMs to model), and then commit changes during CRUD operations. On returning data to the provider, ensure transformations are accurate to the expected DM structure.

Examples


// entities1.service.ts
import { Injectable } from '@nestjs/common';
import { Entities1Repository } from '../repositories/entities1.repository';
import { Entity1Dm } from '../models/dms/entity1.dm';
import { Entities1Transformer } from '../transformers/entities1.transformer';
import { Entity1Model } from '../schemas/entity1.schema';
@Injectable()
export class Entities1Service {
  constructor(private readonly entities1Repository: Entities1Repository) {}
  public async createEntity1(entity1Dm: Entity1Dm): Promise<Entity1Dm> {
    const entity1Model: Entity1Model = Entities1Transformer.transformCreationEntity1DmToEntity1Model(entity1Dm);
    const newEntity1Model: Entity1Model = await this.entities1Repository.create(entity1Model);
    return Entities1Transformer.transformCreationEntity1ModelToEntity1Dm(newEntity1Model);
  }
}
Diagrams
Open Backend Layers-Service.drawio.png
Backend Layers-Service.drawio.png
Diagram shows the service's relationship with other layers.
Repository
Description
The Repository layer is responsible for handling data communication with external sources, including servers, databases, and message queues. It serves as a direct interface to these data sources, abstracting low-level data access details from the higher layers.

Usages
The Repository provides a simple, focused interface for data operations, allowing interaction with external data sources as needed.

It abstracts away the complexity of database or server interactions, providing services with reliable data operations.

Guidelines
Lean Structure: Keep repository functions minimal, focusing on data retrieval, storage, and updates. Model-Only Operations: Repositories should handle only model objects, not knowing or interacting with DTOs or DMs, to maintain a clear separation of concerns.

Flexible Access: Ensure that repositories provide a flexible interface so that services can compose multiple repository methods to meet business needs without embedding high-level logic in the repository itself.

Examples


// entities1.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Entity1Document, Entity1Model } from '../schemas/entity1.schema';
import { Model } from 'mongoose';
@Injectable()
export class Entities1Repository {
  constructor(@InjectModel(Entity1Model.name) private readonly entity1Document: Model<Entity1Document>) {}
  public async create(entity1Model: Entity1Model): Promise<Entity1Model> {
    return await this.entity1Document.create(entity1Model);
  }
}
Diagrams
Open Backend Layers-Repository.drawio.png
Backend Layers-Repository.drawio.png
Diagram shows the repository's relationship with other layers.
Transformer
Description
The Transformer is responsible for converting data between different object types (e.g., DTOs, DMs, models). By centralizing transformation logic, it ensures consistency and reusability, allowing for easy adaptation to changes in data structures without impacting other layers.

Usages
The Transformer handles all conversions needed between data objects across the application, such as transforming a DTO into a DM or a model into a DTO.

It abstracts transformation logic from controllers, providers, services, and repositories, allowing them to focus on their core responsibilities.

Provides a single source for managing changes to data formats and structures, enhancing maintainability.

Guidelines
Centralized Transformations: Keep all transformation logic within the transformer to avoid duplication and improve maintainability.

Reusability: Ensure transformers are built to be reusable across different parts of the application, enabling consistent data handling.

Data Object Integrity: Validate that all transformations preserve the integrity of the data and meet the structural requirements of the receiving layer (e.g., converting a DM to a DTO for a controller response).

Examples


// entities1.transformer.ts
import { CreationEntity1Dto } from '../models/dtos/creation-entity1.dto';
import { Entity1Dm } from '../models/dms/entity1.dm';
import { Entity1ResponseDto } from '../models/dtos/entity1-response.dto';
import { Entity1Model } from '../schemas/entity1.schema';
export class Entities1Transformer {
  public static transformCreationEntity1DtoToEntity1Dm(creationEntity1Dto: CreationEntity1Dto): Entity1Dm {
    return {
      id: undefined,
      createdAt: undefined,
      updatedAt: undefined,
      name: creationEntity1Dto.name,
      description: creationEntity1Dto.description,
      location: creationEntity1Dto.location,
    };
  }
  public static transformCreationEntity1DmToEntity1Dto(entity1Dm: Entity1Dm): Entity1ResponseDto {
    return {
      id: entity1Dm.id,
      createdAt: entity1Dm.createdAt,
      updatedAt: entity1Dm.updatedAt,
      name: entity1Dm.name,
      description: entity1Dm.description,
      location: entity1Dm.location,
    };
  }
  public static transformCreationEntity1DmToEntity1Model(entity1Dm: Entity1Dm): Entity1Model {
    return {
      id: entity1Dm.id,
      createdAt: entity1Dm.createdAt,
      updatedAt: entity1Dm.updatedAt,
      name: entity1Dm.name,
      description: entity1Dm.description,
      location: entity1Dm.location,
    };
  }
  public static transformCreationEntity1ModelToEntity1Dm(entity1Model: Entity1Model): Entity1Dm {
    return {
      id: entity1Model.id,
      createdAt: entity1Model.createdAt,
      updatedAt: entity1Model.updatedAt,
      name: entity1Model.name,
      description: entity1Model.description,
      location: entity1Model.location,
    };
  }
}
Manager
Description
The Manager modules provide cross-project functionality that is not specific to any single project. They serve as reusable modules that can be copied and integrated into different projects as needed. Examples include modules for managing HTTP requests or MongoDB queue connections.

Usages
Managers are used across multiple projects to provide essential functionality, such as API communication or database queue management, without being tied to specific business logic.

They streamline project development by offering tested, reusable solutions for common tasks and infrastructure management.

Guidelines
Project-Agnostic Design: Ensure that managers remain generic and free from project-specific logic, allowing them to be easily reused in different contexts.

Modular and Self-Contained: Design managers to function independently, encapsulating all necessary logic for their purpose.

Documentation and Templates: Keep references and templates for commonly used managers accessible in shared repositories, facilitating easy integration into new projects and consistency across projects.

Examples
References and templates for managers, like ApiCommunicationManagerModule or MongoQueueManagerModule, are often available in shared repositories, such as nest-start-template.

Helper
Description
The Helper module is responsible for encapsulating complex, reusable logic that can be utilized across different parts of the codebase. Helpers are designed to assist with specific tasks, such as constructing HTTP requests or building Elasticsearch queries, making these tasks easier to manage and reuse.

Usages
Helpers are employed to handle tasks that require complex logic or repeated code, enabling reuse and reducing redundancy.

Common uses include building request structures or constructing query formats.

By centralizing logic into helpers, the codebase remains more organized, allowing other layers to perform tasks without directly implementing complex logic.

Guidelines
Reusability: Design helpers to be generic and applicable across multiple parts of the codebase.

Complex Logic Encapsulation: Use helpers to encapsulate complex logic that doesn’t fit cleanly into services or managers, ensuring that code remains maintainable and modular.

Consistency: Apply helpers consistently to standardize processes.

Utils
Description
Utils is responsible for handling simple, common operations that are frequently needed throughout the project. These utilities provide straightforward, reusable functions for tasks like formatting dates, string manipulation, or mathematical calculations.

Usages
Utils are used across the project for basic operations that do not require complex logic or contextual knowledge.

They support various modules by providing consistent implementations of simple tasks that may be repeated in different parts of the code.

Common examples include utility functions for data formatting, parsing, or basic calculations.

Guidelines
Simplicity: Keep utility functions focused on simple, single-purpose operations that can be easily reused.

Reusability: Design utils to be applicable across multiple modules, avoiding any specific business logic.

Organization: Group utilities logically (e.g., DateUtils, StringUtils) to make them easy to locate and use consistently throughout the project.

Example


// date.utils.ts
import * as moment from 'moment';
export class DateUtils {
  public static transformEpochToStringByFormat(epoch: number, format?: string): string {
    return moment(epoch * 1000).format(format);
  }
  public static transformDateToEpoch(date: Date): number {
    if (!date) {
      return null;
    }
    return moment(date).unix();
  }
  public static transformEpochToDate(epoch: number): Date {
    if (!Number.isFinite(epoch)) {
      return null;
    }
    return moment(epoch * 1000).toDate();
  }
  public static getNowAsEpoch(): number {
    return moment().unix();
  }
}
Complete Flows
Open Backend Layers-Basic Layers.drawio.png
Backend Layers-Basic Layers.drawio.png
Diagram show the relation between the layers.
Open Backend Layers-Transformers.drawio.png
Backend Layers-Transformers.drawio.png
Diagram show the data objects that each layers work with.
Encapsulation
Encapsulation is very important principle that help us to keep the code maintainable and flexible. 

 Modules Encapsulation
NestJS adopt the Angular modules mechanism. Thus, we can manage our modules in the project in very flexible way. For example we can build multiple module and choose which of them load base on deployment or load modules in other modules and reuse them as needed. Here are some guidelines for manage our module correctly:

Try to separate modules to be small and specific instead of create big module that import a lot of providers and controllers. Each module responsible for its providers and controllers. It’s important to manage correctly the modules and exports providers that may be used in other modules.

Each module responsible for its providers and controllers. Thus, provider and controller should not be attached to more than one module. If a module should use one of another module’s provider it should import the whole module.

Examples:



// entities1.module.ts
import { Module } from '@nestjs/common';
import { Entities1Controller } from './controllers/entities1.controller';
import { Entities1Provider } from './providers/entities1.provider';
import { Entities1Service } from './services/entities1.service';
import { Entities1Repository } from './repositories/entities1.repository';
import { ApiCommunicationManagerModule } from '../../core/managers/api-communication-manager/api-communication-manager.module';
import { Entities2Module } from '../entities2/entities2.module';
@Module({
  imports: [ApiCommunicationManagerModule, Entities2Module],
  controllers: [Entities1Controller],
  providers: [Entities1Provider, Entities1Service, Entities1Repository],
  exports: [Entities1Provider, Entities1Service, Entities1Repository],
})
export class Entities1Module {}


// entities2.module.ts
import { Module } from '@nestjs/common';
import { Entities2Service } from './services/entities2.service';
import { Entities2Repository } from './repositories/entities2.repository';
import { ApiCommunicationManagerModule } from '../../core/managers/api-communication-manager/api-communication-manager.module';
@Module({
  imports: [ApiCommunicationManagerModule],
  controllers: [],
  providers: [Entities2Service, Entities2Repository],
  exports: [Entities2Service, Entities2Repository],
})
export class Entities2Module {}
Deployment
As mentioned before our projects written in NestJS which manage modules with its mechanism. Thus, we can use this mechanism in order to choose which modules should be loaded and which not. A single project may be separated into multiple deployments while each deployment load different modules and supply only part of the project business logic. For instance, we can create a project that has 2 different deployments. First deployment accessible to the clients via gateway server that enforce user authentication (For our platform or for external API) and the second deployment authentication free and accessible only from the k8s cluster (For backend processes).

Examples:



// app.module.ts
import { Module } from '@nestjs/common';
import { ServiceTypeEnum } from './config/enums/service-type.enum';
const importModulesToLoad = [];
const serviceType: ServiceTypeEnum = process.env.SERVICE_TYPE as ServiceTypeEnum;
if ([ServiceTypeEnum.IMPORTER, ServiceTypeEnum.ALL].includes(serviceType)) {
  importModulesToLoad.push(Entities1ImporterModule);
}
if ([ServiceTypeEnum.API, ServiceTypeEnum.ALL].includes(serviceType)) {
  importModulesToLoad.push(Entities1Module);
}
@Module({
  imports: [...importModulesToLoad],
  contollers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
Data Validation
Its very important that we validate data that our controller received from out side in order to prevent data inconsistency and unexpected errors. NestJS come with various support for class-validator library and we must add validation for each DTO in our project (response or request DTOs).

Basic Validation
class-validator library supports various common validation that we can use, such as simple type validations (@isNumber, @IsString, @IsDate…), common specific validations (@IsDateString, @IsUrl, @IsInt…) and a lot of common validations (@MinLength, @Contains, @Matches...).

Examples:



// location.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
export class LocationDto {
  @ApiProperty()
  @IsNumber()
  long: number;
  @ApiProperty()
  @IsNumber()
  lat: number;
}
Nested Validation
class-validator library supports more complex and nested validations (@Type, @ValidateNested, @IsArray…) that supports complex objects.

Examples:



// entity1.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { LocationDto } from './location.dto';
export class Entity1Dto {
  @ApiProperty()
  @IsString()
  id: string;
  @ApiProperty()
  @IsDate()
  createdAt: Date;
  @ApiProperty()
  @IsDate()
  updatedAt: Date;
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string;
  @ApiProperty()
  @ValidateNested()
  @Type(() => LocationDto)
  @IsObject()
  location: LocationDto;
}
Custom Validation
class-validator library supports custom validations (@Type, @ValidateNested, @IsArray…) that let us create our own validation base on our needs.

Examples:



// is-string-or-number.validation.ts
import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
@ValidatorConstraint({ name: 'string-or-number', async: false })
export class IsNumberOrStringConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    return typeof value === 'number' || typeof value === 'string';
  }
  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be number or string`;
  }
}
export function IsNumberOrString(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsNumberOrStringConstraint,
    });
  };
}


// entity2.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNumberOrString } from '../../../../shared/validations/is-string-or-number.validation';
export class Entity2Dto {
  @ApiProperty()
  @IsNumberOrString()
  id: string | number;
}
Validation Operator
class-validator library supports validation operators that let us create our basic validation template and then create more specific validation derived from the template. We can use multiple operators together in order to derive the requested validations. Common operator are:

PartialType: Create new DTO that all fields of the template DTO are optional.

OmitType: Create new DTO and omit specific fields from the template DTO.

PickType: Create new DTO and pick specific fields from the template DTO.

IntersectionType: Create new DTO that combines fields from multiple DTOs.

More information may found in NestJS Docs Validation - Mapped types

Examples:



// update-entity1.dto.ts
import { PartialType } from '@nestjs/swagger';
import { Entity1Dto } from './entity1.dto';
export class UpdateEntity1Dto extends PartialType(Entity1Dto) {}


// creation-entity1.dto.ts
import { OmitType } from '@nestjs/swagger';
import { Entity1Dto } from './entity1.dto';
export class CreationEntity1Dto extends OmitType(Entity1Dto, ['id', 'createdAt', 'updatedAt'] as const) {}


// update-entity1-location.dto.ts
import { PickType } from '@nestjs/swagger';
import { Entity1Dto } from './entity1.dto';
export class UpdateEntity1LocationDto extends PickType(Entity1Dto, ['location'] as const) {}


// combined-entities.dto.ts
import { IntersectionType } from '@nestjs/swagger';
import { Entity1Dto } from './entity1.dto';
import { Entity2Dto } from '../../../entities2/models/dtos/entity2.dto';
export class CombinedEntitiesDto extends IntersectionType(Entity1Dto, Entity2Dto) {}
Naming
We have some naming conventions, these are guidelines and discretion can be exercised as needed. Here some of them:

File Naming: File name using kebab-case and consist of the name of the file, the type and file extension. Template: <NAME>.<TYPE>.<EXTENSION>. Examples: date.utils.ts, threat-actors.controller.ts, geography.dm.ts…

Function Naming: Function name using camelCase and should be informative as possible in order to explain what the function does. Usually function name start with a verb that explain the kind of operation, after that the entity that should be manipulated. If needed some specification may add to the end too. Examples: transformGeographyDmToGeographyDto(), getThreatActorById(), createPlaybook()…

Variable Naming: Variable name using camelCase and should be clear and related to type if needed. If the variable represent an array it should be noted that these are plural. Examples: threatActorDm, geographyDtos, oldPlaybookDms, updatedPlaybookDms…

Constant Naming: Constant name using UPPER_CASE (separated by underscore). When we refer to constant we mean a read-only value that we may need to use in multiple places and we want it to has an informative name. Examples: IOCS_CSV_HEADERS, DEFAULT_THREAT_ACTORS_PER_REQUEST, GET_INDICES_COUNTERS_TIMEOUT…

Clean Code
Write clean code is very important in order to keep the project easy to read and maintain between team members. Here’s are some tools that we are using in our project:

eslint: Each project has .eslintrc.js file that set the linter configuration.

prettier: Each project has .prettierrc file that set the prettier configuration. Prettier must be activate in our project, here’s example how to activate it:

Open image-20241030-123351.png
image-20241030-123351.png
Project Organization
Project organization is very important in order to keep the project easy to maintain. There are a lot of attitudes in this subject and it may change from project to project but the main guidelines are:

All project configuration files (For example: package.json, tsconfig.json, Dockerfile, .prettierrc…) located directly under root directory.

All tests files are located under /test directory (Which located directly under root directory).

All source files are located under /src directory (Which located directly under root directory). Here's the main guidelines how to organize /src directory:

app.module.ts and main.ts located directly under /src directory.

/src/config contains all files that responsible to fetch global configurations.

/src/core contains all our project’s managers (Like ApiCommunicationManagerModule and ElasticsearchManagerModule).

/src/guards contains all our project’s guards (Like AuthenticationGuardModule and AuthorizationGuardModule).

/src/Interceptors contains all our project’s interceptors (Like TimeoutInterceptor).

/src/logger contains all files that responsible for logs.

/src/utils contains all our project’s utilities (Like DateUtil and StringUtil).

/src/shared contains all our files that should be shared between our modules in the project.

/src/modules contains all our modules that responsible for the project business logic.

end of backend conventions.


Frontend Conventions:

Owned by Chen Nachum

Last updated: about 3 hours ago by Ben Berizovsky
9 min read

5 people viewed
Glossary
Type

Description & Purpose

DTO (Data transfer object)

An interface representing the structure of data for API requests or responses.

DM (Data model)

An interface that defines the structured data model within the application domain or a specific module.

VM (View model)

An interface that encapsulates data and behavior for a specific component or set of components in the view, facilitating data binding and UI state management.

Interface

A basic interface used to define the structure of an object.

Enum

A defined type used to represent a set of named constants in the application.

Transformer

A class, either injectable or non-injectable, that contains static functions for transforming data between different formats.

Helper

A class, either injectable or non-injectable, that provides utility functions to assist with application or component-specific business logic and operations.

Service

An injectable class responsible for performing API requests, business logic, managing micro-states, and providing functionality used by managers and components.

Manager

An injectable class responsible for overseeing state management, modifying states, and retrieving state data within the application.

Component

A building block of the application that represents a view, which can be either a smart component (container) or a dumb component (presentational).

Template Pipe

An injectable class that transforms data for display in templates, enabling formatting, filtering, or modifying output dynamically.

Directive

A class that modifies the behavior or appearance of the DOM, enabling custom HTML attributes and components.

Data objects examples
Our application has a few data object types, focusing on DTO, DM and VM.

 

DTOs:

Description: DTOs define the request and response data structure between the application and external systems. They help standardize data formats, enforce type safety, and encapsulate only the necessary data.

Usage:

Standardize Data: Maintains consistency across external communications.

Encapsulate Data: Shares only required data with external systems.

Separate Concerns: Distinguishes internal models from external data formats.

Simplify Validation: Eases data validation and transformation.

File Naming Convention:

Request: example-request.dto.ts

Response: example-response.dto.ts

Examples:

Request DTO:



// example-request.dto.ts
export interface ExampleRequestDto {
    userId: number;
  }
 

Response DTO



// example-response.dto.ts
export interface ExampleResponseDto {
    userName: string;
    title: string;
    content: string;
    createdAt: Date;
}
 

DM (Data model)

Description: Represents internal business entities, focusing on structuring application data for business logic and computations. DMs are shared across the application.

Usage:

Stores data for business logic processing.

Can include computed properties for business requirements.

Acts as a reliable source of truth for the app’s core data.

File Naming Convention: example.dm.ts



// example.dm.ts
export interface ExampleDm {
    id: number;
    userId: number;
    title: string;
    content: string;
    createdAt: Date;
}
 

VM (View model)

Description: Used for transforming data into a format tailored for UI binding and state management, VMs are created when significant data transformation is needed for display.

Usage:

Combines multiple DMs or includes computed properties.

Reduces clutter in components by minimizing local variables.

Only necessary when a clear advantage in organizing display logic is gained, its HTML specific data binding

Decouple data separates DMs from UI-specific concerns to clearly distinguish data structure and presentation.

 

File Naming Convention: example.vm.ts



// example.vm.ts
export interface ExampleVm {
    id: number;
    userId: number;
    title: string;
    content: string;
    createdAt: Date;
    isEditing: boolean; // Additional property for UI state
}
Additional Types
Interface: Basic data structures for modeling shapes of data across the application.

Naming Convention: example.interface.ts

Enum: Defines constant sets of values for various types used across the app.

Naming Convention: example.enum.ts

Services
Description: Services are injectable classes containing shared business logic and essential operations. They are central to the application’s data flow, responsible for handling API communication, data transformation, and reusable functions across components.

Usage:

Data Transformation: Transform raw data from APIs into a format suitable for use in the application, using helper methods or transformers where needed.

Reusable Business Logic: Encapsulate shared logic to prevent duplication and keep components focused on UI-related code.

Cross-Component Communication: Allow multiple components to share and access the same state or data, supporting consistent and synchronized behavior across the application.

Provisioning Best Practices:

Root-Level Provisioning: By default, services should be provided in the root to make them available across the entire application.

Module-Level Provisioning: For cases requiring multiple instances of the same service with different data (e.g., showing two components that need isolated states), avoid root-level provisioning. Instead, provide the service within the specific module that requires a unique instance.

File Naming Convention: user-service.service.ts

Never use provided in root if you need to show two same components that should handle different data, they will share the same state.



@Injectable({ providedIn: 'root' })
export class UserService {
  getUsers(message: string): Observable<GetUsersResponseDto> {
   // .....
  }
}
 

Transformer

Description: Transformers facilitate the conversion between different data models, allowing data to flow seamlessly across application layers. This ensures that each layer—DTO, DM, and VM—maintains its specific structure while being compatible with other layers.

Usages:

Convert external data structures (DTOs) to internal data models (DMs).

Adapt internal data models (DMs) for UI rendering as view models (VMs).

Support back-and-forth transformations between these models to synchronize data and ensure consistency across the application.

File Naming Convention: example.transformer.ts



export class Transformer {
    static requestDtoToDm(dto: RequestDTO): DataModel {
        return {
            id: 0, // Assuming a new post has no ID initially
            userId: dto.userId,
            title: dto.title,
            content: dto.content,
            createdAt: new Date(), // Set the created date to now
        };
    }
    static responseDtoToDm(dto: ResponseDTO): DataModel {
        return {
            id: dto.id,
            userId: dto.userId,
            title: dto.title,
            content: dto.content,
            createdAt: dto.createdAt,
        };
    }
    static dmToVm(dm: DataModel): ViewModel {
        return {
            ...dm,
            isEditing: false, // Default state for UI
        };
    }
    static vmToDm(vm: ViewModel): DataModel {
        return {
            id: vm.id,
            userId: vm.userId,
            title: vm.title,
            content: vm.content,
            createdAt: vm.createdAt,
        };
    }
}
Helpers
Description: Helpers provide simple, reusable utility functions to support application logic, aiding in common operations like string manipulation, date formatting, form creation, and more. They are typically static and intended to assist with logic, not to manage state.

Usages:

Simplify logic by breaking down complex calculations or manipulations into modular, reusable functions.

Ensure consistency in operations (e.g., date formatting, validation) across different parts of the application.

Serve as a utility toolbox for operations that don’t require dependency injection.

File Naming Convention: form.helper.ts



export class FormHelper {
  static createUserForm(user: UserDM): FormGroup {
    return new FormGroup({
      firstName: new FormControl(user.firstName, Validators.required),
      lastName: new FormControl(user.lastName, Validators.required),
      email: new FormControl(user.email, [Validators.required, Validators.email])
    });
  }
}
Managers
Description: Managers are responsible for handling a specific set of actions and managing micro-states across the application. They often encapsulate functionality that is reused by multiple components and can coordinate complex interactions or workflows. Unlike services, which mainly handle data retrieval and business logic, managers focus on managing the application's state, user interactions, or shared functionality.

Usages:

Manage and encapsulate the application state, making it easier to coordinate interactions between components.

Provide observable streams of data for components to subscribe to, enabling reactive updates to the UI.

Simplify the flow of data and actions within the application, helping to keep components focused on presentation rather than state management.

File Naming Convention: user.manager.ts



@Injectable({ providedIn: 'root' })
export class UserManager {
  private userSubject = new BehaviorSubject<User | null>(null); // Holds the current user's data
  user$ = this.userSubject.asObservable(); // Observable for components to subscribe to
  constructor(private userService: UserService) {}
  // Load user details by ID and update the userSubject observable
  loadUser(userId: number): Observable<User> {
    return this.userService.getUserDetails(userId).pipe(
      tap((userData: User) => this.userSubject.next(userData)) // Update state
    );
  }
  // Update user profile information and reflect changes in userSubject
  updateUser(user: Partial<User>): Observable<User> {
    return this.userService.updateUserProfile(user).pipe(
      tap((updatedUser: User) => this.userSubject.next(updatedUser)) // Reflect updated state
    );
  }
  // Get the current user's data from userSubject
  getCurrentUser(): User | null {
    return this.userSubject.getValue();
  }
  // Clear user data, for example, on logout
  clearUser() {
    this.userSubject.next(null); // Reset state
  }
}
Flow example: Request and Transformation
This section outlines the flow of making an API request, receiving a response, transforming the data, and updating the View Model.

1. Request API and Receive Response DTO
When requesting user details, the UserService is utilized to fetch the data. The response is expected to be in the form of a Data Transfer Object (DTO). The following example demonstrates this process:



this.userService.getUserDetails(userId).subscribe((responseDto: ExampleResponseDto) => {
    // Transform the Response DTO to Data Model (DM)
    const userData: ExampleDm = Transformer.responseDtoToDm(responseDto);
    // Update the View Model (VM) with the transformed data
    this.updateViewModel(userData);
});
 

2. Transform to Data Model (DM) / View Model (VM)
Once the response DTO is received, it is transformed into the internal Data Model (DM) and then to the View Model (VM) for use in the UI:



// Transform to Data Model (DM)
const userData: ExampleDm = Transformer.responseDtoToDm(responseDto);
// Transform to View Model (VM)
const viewModel: ExampleVm = Transformer.dmToVm(userData);Components general
Summary
Request API: The API call is made to fetch user details, and the response is handled through subscription.

Transformations: The received DTO is transformed into a Data Model and subsequently into a View Model, ensuring the data is structured appropriately for UI representation.

Components General
Components are the fundamental building blocks of an Angular application. They are responsible for managing the user interface (UI) and encapsulate various functionalities, including:

Template Rendering Logic: Components define the structure and layout of the UI using templates, which are written in HTML. This allows for dynamic content generation based on the component's state.

User Interaction Handling: Components manage user interactions, such as clicks, inputs, and events, providing a way to respond to user actions and update the UI accordingly.

Basic Form Management: Components can handle form inputs and validations, allowing users to submit data and interact with the application seamlessly.

Data Presentation: Components present data retrieved from services or passed down from parent components, ensuring a clear and organized display of information to the user.

Communication with Services for Data Operations: Components interact with services to perform data operations, such as fetching data from APIs, updating data, or managing application state, ensuring a clear separation of concerns.

 

Component injectables tree

This is how a component may look, while working with helpers, services, and a manager.

 

Open image-20241029-094827.png
image-20241029-094827.png
 

State Management
State management can be handled in different ways depending on the complexity and scope of the application. The following strategies can be employed:

1. Store (RxJs)
Description: The store is suitable for managing complex application-wide state, especially when multiple components need access to the same state.

When to Use:

For complex application-wide state management.

When state is accessed by many components.

When state changes are frequent.

When state changes need to be tracked or debugged.

When strong consistency in state updates is required.

Benefits:

Centralized state management provides a single source of truth.

Facilitates debugging and tracking of state changes through time-travel debugging.

Enhances testability by isolating state logic from UI components.

2. Services
Description: Services are a good choice for medium-complexity shared state that doesn't require the overhead of a store.

When to Use:

When state is shared between multiple components.

When state needs to persist across route changes.

When state management requirements are simpler than what warrants a store.

Benefits:

Lightweight and easy to implement for moderate shared state.

Encourages encapsulation of business logic and state management within services.

Allows for simpler component designs by abstracting state logic.

3. Component Level
Description: This approach is ideal for managing simple, component-specific state.

When to Use:

When state is only used within a single component.

When state doesn't need to persist beyond the component's lifecycle.

When managing local UI state, such as form data, toggles, or local filters.

Benefits:

Keeps state management straightforward and localized.

Reduces the need for additional layers of abstraction, making the component easier to understand and maintain.

Enhances performance by limiting state reactivity to component scope.

RxJS
RxJS is a library for reactive programming using Observables, making it easier to compose asynchronous or callback-based code. It is particularly useful for handling HTTP requests and other asynchronous operations.

Key Considerations
Subscription Management: After subscribing to an observable, it is crucial to unsubscribe when the component or service is destroyed. This practice prevents memory leaks and ensures efficient resource management.

Using ObservableSubscriptionComponent: For components, we utilize the ObservableSubscriptionComponent abstract class. This class helps track all active subscriptions, enabling automatic cleanup in the ngOnDestroy lifecycle hook. This approach maintains optimal application performance by ensuring that resources are released appropriately.

Template Pipes
We use template pipes to easily transform data in our component’s template. You can read more about the syntax of pipes here.

Popular pipes that are used:

 

Translate

some_key | translate - Translates a key to the selected language in the system

 

bigNumbersSuffix

number_variable| bigNumbersSuffix- Translates a key to the selected language in the system

For more examples read the PipesModule

end of frontend conventions.