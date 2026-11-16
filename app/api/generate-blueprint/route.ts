import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { domain, stage, timeline, features, name, email, brief } = body;

    // Dynamic architecture & stack mapping tailored to Cynbit's core engineering pillars
    const architectureMap: Record<string, {
      stack: string[];
      architecturePattern: string;
      baseWeeks: number;
      baseCostINR: number;
    }> = {
      'ai-agents': {
        stack: ['Next.js 15', 'FastAPI (Python)', 'LangChain / LangGraph', 'Pinecone Vector DB', 'OpenAI / Anthropic API', 'Docker + AWS ECS'],
        architecturePattern: 'Event-Driven RAG & Autonomous Multi-Agent Orchestration Pipeline',
        baseWeeks: 6,
        baseCostINR: 350000,
      },
      'fullstack-saas': {
        stack: ['Next.js 15 (TypeScript)', 'Node.js / Express', 'PostgreSQL (Prisma)', 'Redis Cache', 'Tailwind CSS', 'Vercel + AWS RDS'],
        architecturePattern: 'Modular Monolith with Edge-Cached SSR & REST/GraphQL API Layer',
        baseWeeks: 8,
        baseCostINR: 420000,
      },
      'cloud-devops': {
        stack: ['Terraform (IaC)', 'Kubernetes (EKS)', 'GitHub Actions CI/CD', 'Prometheus + Grafana', 'Docker', 'AWS / GCP'],
        architecturePattern: 'Zero-Downtime Multi-Region Microservices with Automated Auto-Scaling',
        baseWeeks: 5,
        baseCostINR: 280000,
      },
      'data-analytics': {
        stack: ['Apache Airflow', 'Snowflake / BigQuery', 'dbt', 'Python (Pandas/Spark)', 'Next.js BI Dashboard', 'AWS S3'],
        architecturePattern: 'Modern ELT Data Lakehouse with Real-Time Streaming Telemetry',
        baseWeeks: 6,
        baseCostINR: 320000,
      },
    };

    const selected = architectureMap[domain] || architectureMap['fullstack-saas'];

    // Stage & feature multipliers
    const stageMultiplier = stage === 'enterprise' ? 1.6 : stage === 'scaling' ? 1.25 : 1.0;
    const featureWeeks = Math.ceil((features?.length || 0) * 0.75);
    const totalWeeks = Math.round(selected.baseWeeks * stageMultiplier) + featureWeeks;
    const estimatedBudget = Math.round((selected.baseCostINR * stageMultiplier + (features?.length || 0) * 35000) / 10000) * 10000;

    const sprints = [
      {
        phase: 'Sprint 1 (Weeks 1–2)',
        title: 'Discovery, System Architecture & DB Schema',
        deliverable: 'Interactive wireframes, API contract specs, and cloud environment setup.',
      },
      {
        phase: `Sprint 2 (Weeks 3–${Math.max(4, totalWeeks - 2)})`,
        title: 'Core Engineering & Feature Implementation',
        deliverable: `Full implementation of ${selected.architecturePattern} + ${features?.length || 0} selected modules.`,
      },
      {
        phase: `Sprint 3 (Weeks ${Math.max(5, totalWeeks - 1)}–${totalWeeks})`,
        title: 'QA Load Testing, Security Audit & Production Rollout',
        deliverable: 'Automated CI/CD deployment, Lighthouse performance optimization, and handover docs.',
      },
    ];

    const blueprint = {
      id: `CYN-${Math.floor(100000 + Math.random() * 900000)}`,
      timestamp: new Date().toISOString(),
      client: { name, email, brief },
      domain,
      stage,
      targetTimeline: timeline,
      architecturePattern: selected.architecturePattern,
      recommendedStack: selected.stack,
      selectedFeatures: features || [],
      estimatedWeeks: totalWeeks,
      estimatedBudgetFormatted: `₹${(estimatedBudget / 100000).toFixed(2)} Lakhs (Approx. $${Math.round(estimatedBudget / 84).toLocaleString()})`,
      sprints,
    };

    return NextResponse.json({ success: true, blueprint });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to generate blueprint' }, { status: 400 });
  }
}