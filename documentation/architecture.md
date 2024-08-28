# Clean Architecture

Clean Architecture is a software design philosophy that separates concerns into distinct layers, promoting modularity, testability, and maintainability.
This approach organizes code into concentric circles, with the innermost circles representing the corebusiness logic and the outermost circles dealing with
external concerns.

1. The **Presentation** Layer manages user interface and interactions.

2. The **Domain** Layer contains essential entities and business rules.

3. The **Infrastructure** Layer deals with technical details like databases, APIs, and external services.

4. The **Application** (Main) Layer serves as the entry point of the application, coordinating the initialization and configuration of all components, including dependency injection, application settings, and the startup process.

## Layers

![https___dev-to-uploads s3 amazonaws com_uploads_articles_mfr2nu3hlqwayrs6yz64](https://github.com/user-attachments/assets/20ac22cd-8f26-49a7-9f84-39d6877a5ad1)