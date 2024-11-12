# Elasticsearch Key Concepts

## 1. Distributed Architecture

Elasticsearch is a distributed search engine, meaning it can scale horizontally by distributing data across multiple nodes. This makes it highly available and scalable.

## 2. Indexes and Collections

In Elasticsearch, an index is similar to a "collection" in MongoDB, grouping documents with a similar structure. However, it’s different from the concept of an "index" in MongoDB, where an index optimizes search speed.

## 3. Documents and Mappings

Indexes contain documents, and each document is a JSON object with structured fields. Mappings define how fields within documents are stored and indexed, specifying field data types and rules for each field.

## 4. Mapping Creation and Updates

Mappings can be created or updated via HTTP calls (APIs), allowing for flexible schema updates without downtime.

## 5. Field Types

Elasticsearch supports multiple field types:

- **Text fields** for full-text searches.
- **Keyword fields** to handle exact matches and act like enums.
- **Numeric fields** (e.g., floats, integers) and **date fields** that support range queries.
- **Boolean fields** for true/false values.
- **Geo fields** for spatial data.

## 6. Nested Fields

Similar to denormalization in MongoDB, nested fields in Elasticsearch allow for object storage within documents. However, if nested data changes frequently but isn’t queried often, it’s more efficient to keep it outside the main document, and the reverse is true for infrequent updates.

## 7. Concurrency Control with Versioning

Elasticsearch includes version control for handling race conditions in update requests. This ensures updates apply only to the latest document version, reducing conflicts in concurrent environments.

## 8. Schema Flexibility

Elasticsearch’s schema can be modified dynamically. However, planning mappings initially is advised to avoid complex schema migrations later.

## 9. Full-Text Search Capabilities

Elasticsearch is optimized for full-text search. It supports multiple query types, including match, term, range, and wildcard queries, making it versatile for various search scenarios.

## 10. Aggregation Framework

Aggregations are powerful tools for analytics within Elasticsearch, allowing for data grouping, statistical analysis, and complex calculations across large datasets.

## 11. Filtering and Querying

Elasticsearch differentiates between filters (for boolean criteria) and queries (for relevancy scores). Filters are faster and used for exact matches, while queries help with scoring results.

## 12. Inverted Index

Unlike traditional databases, Elasticsearch uses an inverted index to store its data, making full-text search operations fast and efficient.

## 13. Sharding and Replication

Data is divided into shards, which are distributed across nodes. Replicas provide fault tolerance, as copies of shards on separate nodes increase redundancy and improve search availability.

## 14. RESTful API

Elasticsearch has a RESTful API, allowing you to interact with it via HTTP requests, making it accessible and easily integrable into various applications.

## 15. Bulk Operations

For handling large datasets, Elasticsearch supports bulk operations, which can be used to batch multiple operations (such as creating, updating, or deleting documents) in a single request, improving performance.

## 16. Data Lifecycle Management (DLM)

Elasticsearch offers data management features that allow users to define policies to handle the lifecycle of their indexes, ensuring efficient data storage and retention practices.

## 17. Cluster Health Monitoring

Elasticsearch provides health checks and cluster management tools, allowing monitoring and maintaining the stability and performance of the Elasticsearch cluster.
