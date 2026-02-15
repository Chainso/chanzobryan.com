---
layout: post
title: "Introducing the Prophet Ontology"
date: 2026-02-14 09:00:00 -0800
author: Chanzo Bryan
image: /assets/images/projects/prophet-card.png
excerpt: "Prophet starts from a simple idea: define your business domain once, then generate the repetitive backend scaffolding across stacks without letting contracts drift."
reading_time: 5
tags:
  - Ontology
  - RDF
  - Code Generation
---

As organizations scale, a familiar problem appears: core business concepts split into multiple technical interpretations.

Orders live in one service, approvals in another, and reporting models in a third. Each team makes reasonable local decisions. Over time, the full system stops agreeing with itself.

That is the core problem Prophet is designed to solve.

## Why This Matters for Businesses

Most reliability failures are not one dramatic outage. They are small semantic mismatches that accumulate.

If one service treats an order as approved while another uses a different lifecycle interpretation, operations slow down. Data trust degrades. Teams burn roadmap time reconciling definitions that should have been consistent from the start.

This is not only a code quality problem. It is a model quality problem.

## Where Prophet Fits

Prophet is designed to turn business modeling into an explicit engineering workflow.

You define the business domain in a modeling language, then let generation produce the repetitive integration surface around that model. That keeps the system anchored to the real-world business concepts instead of letting each layer drift on its own.

## A Single Domain Contract

Prophet is ontology-first.

An [ontology](https://en.wikipedia.org/wiki/Ontology_(information_science)) is a formal model of a domain: what entities exist, what they mean, how they relate, what actions they support, and what events they emit.

In business terms, this is a shared language for the organization. Instead of remapping concepts in every layer, teams keep one business model and derive implementation surfaces from it.

## The Modeling Language

Prophet’s DSL is intentionally compact, but it captures the full shape of an operational domain.

Core concepts:

- `object`
- `struct`
- `action`
- `signal`
- `trigger`
- `state`
- `transition`

### `object`
An `object` is a business entity with identity. Think of entities like `Order`, `User`, or `Invoice`. In Prophet, objects hold fields and keys, and they are the primary units that query and persistence layers are generated around.

The key detail is identity modeling. Keys are not just implementation details for a table. They are part of the domain contract. Once identity is explicit in the model, generated APIs and repositories can stay consistent about how that entity is created, fetched, and referenced.

### `struct`
A `struct` is a reusable value shape without standalone identity. It is used for nested data that belongs inside other contracts, such as an address, money breakdown, or embedded metadata block.

Using `struct` keeps models normalized at the semantic layer. You avoid copy-pasting the same field groups across objects and action payloads, and changes to shared value shapes become deliberate and centralized.

### `action`
An `action` describes an operation with typed input and typed output. It is how domain behavior is modeled, not just data shape.

This distinction matters. CRUD-oriented schemas often capture storage shape but not intent. Actions encode intent explicitly: create, approve, ship, refund, reconcile, and so on. Prophet then projects those actions into runtime endpoints and typed contracts while leaving implementation logic in user-owned handlers.

### `signal`
A `signal` is an explicit event contract. It models events that need stable semantics across boundaries, such as integration events, notifications, or downstream triggers.

Because signals are modeled in the DSL, their payload shape is versioned with the domain, not ad hoc in individual services. That improves event contract stability for consumers.

### `trigger`
A `trigger` links event flow to modeled behavior. It defines reactive relationships in the domain model so dependent workflows can be represented explicitly.

Even when trigger execution is implemented in user code, modeling the trigger relationship in the ontology makes system intent visible and analyzable.

### `state`
A `state` models lifecycle stages for an object. For example, an order can be `CREATED`, `APPROVED`, then `SHIPPED`.

State modeling turns lifecycle from informal convention into formal contract. This allows generated layers to stay aligned with actual business flow instead of each service inventing its own interpretation.

### `transition`
A `transition` models allowed movement between states. It is where lifecycle rules become explicit and enforceable.

Transitions are important for correctness. They encode the legal path of an entity through time, which is critical for workflows where ordering and policy matter.

### Event Semantics
In Prophet, events are broader than explicit `signal` blocks. Action outputs and object transitions are also event surfaces by definition. That means action contracts, lifecycle evolution, and event interfaces remain coupled to the same source model instead of drifting apart.

## Concrete DSL Example

Here is a compact example that uses core concepts (`object`, `struct`, `action`, `signal`, `state`, `transition`) in one model:

```prophet
ontology CommerceLocal {
  version "0.1.0"

  object Order {
    field orderId { type string key primary }
    field customerUserId { type string }
    field totalAmount { type decimal }
    field shippingAddress { type ShippingAddress }

    state CREATED
    state APPROVED
    state SHIPPED

    transition approve { from CREATED to APPROVED }
    transition ship { from APPROVED to SHIPPED }
  }

  struct ShippingAddress {
    field line1 { type string }
    field city { type string }
    field countryCode { type string }
  }

  action createOrder {
    kind process
    input {
      field customerUserId { type string }
      field totalAmount { type decimal }
      field shippingAddress { type ShippingAddress }
    }
    output {
      field order { type ref(Order) }
      field currentState { type string }
    }
  }

  signal PaymentCaptured {
    field order { type ref(Order) }
    field providerRef { type string }
  }
}
```

From this model, generation produces a predictable runtime surface:

- action endpoint: `POST /actions/createOrder`
- object reads: `GET /orders`, `GET /orders/{id}`
- typed query: `POST /orders/query`
- SQL/OpenAPI artifacts
- typed contracts and ORM adapters in the selected stack target

This is where the DSL pays off. The domain intent is written once and projected consistently into multiple technical surfaces.

## How Code Generation Works

The pipeline is compiler-like:

1. Parse and validate DSL.
2. Build canonical IR (`.prophet/ir/current.ir.json`).
3. Generate deterministic artifacts under `gen/**`.
4. Emit ownership manifests for regeneration safety.

The IR boundary is important. It gives generators a stable contract and enables compatibility checks that are not tied to ad hoc file diffs.

Core generated outputs include:

- `gen/sql/schema.sql`
- `gen/openapi/openapi.yaml`
- stack-specific runtime code (Spring/Node/Python)
- migration artifacts (Flyway/Liquibase + delta report)
- ownership manifests (`generated-files.json`, `extension-hooks.json`)

## Supported Runtime Targets

| Language | Framework | ORM/Adapter |
| --- | --- | --- |
| Java | Spring Boot | JPA |
| Node | Express | Prisma |
| Node | Express | TypeORM |
| Node | Express | Mongoose |
| Python | FastAPI | SQLAlchemy |
| Python | FastAPI | SQLModel |
| Python | Flask | SQLAlchemy |
| Python | Flask | SQLModel |
| Python | Django | Django ORM |

## Why This Direction Matters

The immediate value is speed from a minimal DSL. The longer-term value is model integrity across a polyglot system.

The practical shift is this: treat the business model as a real engineering artifact, then build runtimes from it in a controlled and repeatable way.

## Try Prophet

If this approach resonates, start with the repository docs and run one of the sample stacks locally.

<div style="text-align: center; margin: 2rem 0;">
  <a href="https://github.com/Chainso/prophet" target="_blank" class="btn btn-primary">
    View Prophet on GitHub
  </a>
</div>
