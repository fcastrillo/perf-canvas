import { Octokit } from '@octokit/rest';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO_OWNER = 'fcastrillo';
const REPO_NAME = 'perf-canvas';

if (!GITHUB_TOKEN) {
  console.error('❌ GITHUB_TOKEN environment variable is not set');
  process.exit(1);
}

const octokit = new Octokit({ auth: GITHUB_TOKEN });

interface Issue {
  title: string;
  body: string;
  labels: string[];
  milestone?: number;
}

const issues: Issue[] = [
  // Vision Epic (Reference)
  {
    title: '[VISION] Station MIS - Complete Implementation Plan',
    body: `## 🎯 Vision Overview

This epic serves as the central reference for the Station MIS implementation. It preserves the architectural vision, team mappings, and metric formulas from the Knowledge Transfer documentation.

### 📚 Key Resources
- **Knowledge Transfer Document**: [Knowledge-Transfer.md](../blob/main/Knowledge-Transfer.md)
- **Repository**: https://github.com/fcastrillo/perf-canvas

### 🏢 Real Teams (6 Teams)
1. **BAU (Business as Usual)** - BTE Project
2. **LUCA Team** - LUCA Project  
3. **Ilana Va** - IVA Project
4. **Ilana App** - FD247 Project
5. **Platform** - TAAS Project
6. **Cashless** - CAS Project

### 🔗 Jira ↔ GitLab Relationships (1-to-Many)
- **BTE** → 4 GitLab projects: [48313593, 38286527, 38376559, 38119878]
- **LUCA** → 1 GitLab project: [60424150]
- **IVA** → 1 GitLab project: [56123456]
- **FD247** → 1 GitLab project: [60835113]
- **TAAS** → 2 GitLab projects: [69864106, 48313593]
- **CAS** → 1 GitLab project: [71234567]

### 📊 Current Application Metrics (7 Metrics)
1. **Cycle Time** (Tiempo de Ciclo Promedio) - days
2. **Deployments** (Despliegues por Semana) - deploys/week
3. **Productivity** (Productividad Equipo) - %
4. **Quality** (Calidad Código) - score/10
5. **Deviation** (Desviación Fechas Release) - %
6. **Errors** (Errores Post-Despliegue) - %
7. **Critical Tickets** (Tickets Críticos) - avg

### 🚀 Future Release Metrics (Production Scope)
From Jira versions API and JQL analysis:
- **release_size**: Total story points/tickets per release
- **actual_development_days**: First "In Progress" → Resolution
- **implementation_date**: Actual vs planned release date
- **cab_time_days**: Change Advisory Board approval time
- **on_time_delivery**: Schedule adherence metrics
- **delay_days**: Schedule variance tracking
- **ticket_type_distribution**: Stories, bugs, tasks breakdown
- **quality_index**: Bugs-to-features ratio, hotfix frequency

### 📋 Implementation Phases
- **M1**: Mocked Application Update (Immediate)
- **M2**: Backend Foundation (Future)
- **M3**: Jira/GitLab Integrations (Future)
- **M4**: Release Analytics (Future)
- **M5**: Production Readiness (Future)

---

**Related Issues**: All implementation issues link back to this vision epic.`,
    labels: ['type:epic', 'scope:vision', 'pinned']
  },

  // KPI Formulas Catalog (Reference)
  {
    title: '[REFERENCE] KPI Formulas & API Endpoints Catalog',
    body: `## 📐 KPI Calculation Formulas

### Current Application Metrics

#### 1. Cycle Time
\`\`\`
Formula: AVG(done_date - in_progress_date) for completed issues in last 30 days
Unit: days
Target: 5 days
Threshold: 7 days
\`\`\`

#### 2. Deployment Frequency
\`\`\`
Formula: COUNT(deployments_last_7_days)
Unit: deploys/week
Target: 5
Threshold: 2
\`\`\`

#### 3. Sprint Predictability
\`\`\`
Formula: (delivered_story_points / committed_story_points) × 100
Unit: %
Target: 85%
Threshold: 70%
Note: Use issue_count for teams without story points
\`\`\`

#### 4. Code Quality Score
\`\`\`
Formula: Composite score based on:
- Code coverage (weight: 0.3)
- PR review rate (weight: 0.25)
- Bug rate (weight: 0.25)
- Technical debt (weight: 0.2)
Unit: score/10
Target: 8.5
\`\`\`

### Future Release Metrics

#### 5. Release Frequency (Enterprise)
\`\`\`
Formula: COUNT(DISTINCT versions WHERE released=true) / weeks_since_PI_start
Unit: releases/week
Target: 8.0
Demo Value: 7.63
\`\`\`

#### 6. Releases This PI (Enterprise)
\`\`\`
Formula: COUNT(DISTINCT versions WHERE releaseDate >= PI_start AND released=true)
Unit: count
Demo Value: 61
\`\`\`

## 🔌 API Endpoints

### Jira REST API

#### Get Project Versions (Releases)
\`\`\`
GET https://finvivir.atlassian.net/rest/api/3/project/{PROJECT_KEY}/versions
Example: GET .../project/IVA/versions
Returns: List of all releases with metadata (id, name, releaseDate, released)
\`\`\`

#### Get Issues by Release
\`\`\`
JQL: project={PROJECT} AND fixVersion={VERSION_NAME}
Example: project=IVA AND fixVersion="Release 2.3.0"
Returns: All tickets in that release
\`\`\`

#### Get Cycle Time Data
\`\`\`
JQL: project={PROJECT} AND status=Done AND updated >= -30d
Expand: changelog
Parse: Find "In Progress" transition date from changelog
\`\`\`

#### Get Sprint Data
\`\`\`
GET /rest/agile/1.0/board/{BOARD_ID}/sprint?state=active
GET /rest/agile/1.0/sprint/{SPRINT_ID}/issue
Extract: Story points or issue count for predictability
\`\`\`

#### Get CAB Tickets
\`\`\`
JQL: project=TICKET AND type="CAB: Solicitud de Cambio Tecnológico" 
     AND "Liga de acceso a información del cambio[URL Field]" IS NOT EMPTY
Parse: URL field contains link to related Jira release
\`\`\`

### GitLab API

#### Get Deployments
\`\`\`
GET /api/v4/projects/{ID}/deployments?environment=production&updated_after={DATE}
Extract: created_at, status=success for deployment frequency
\`\`\`

#### Get Merge Requests
\`\`\`
GET /api/v4/projects/{ID}/merge_requests?state=merged&updated_after={DATE}
Extract: created_at, merged_at for PR cycle time
\`\`\`

#### Get Pipeline Success Rate
\`\`\`
GET /api/v4/projects/{ID}/pipelines?updated_after={DATE}
Extract: status (success/failed) for change failure rate
\`\`\`

## 🔐 Authentication

### Jira
\`\`\`javascript
const auth = Buffer.from(\`\${JIRA_USERNAME}:\${JIRA_API_TOKEN}\`).toString('base64');
headers: { 'Authorization': \`Basic \${auth}\` }
\`\`\`

### GitLab
\`\`\`javascript
headers: { 'PRIVATE-TOKEN': GITLAB_TOKEN }
\`\`\`

## 📊 Team Estimation Metrics

| Team | Jira Project | Board ID | Estimation Metric |
|------|--------------|----------|-------------------|
| BAU | BTE | 244 | story_points |
| LUCA | LUCA | 210 | issue_count |
| Ilana Va | IVA | 237 | story_points |
| Ilana App | FD247 | 229 | issue_count |
| Platform | TAAS | 231 | story_points |
| Cashless | CAS | 245 | story_points |

---

**Cross-reference**: This catalog is referenced by all metric implementation issues.`,
    labels: ['type:reference', 'scope:formulas', 'pinned']
  },

  // Milestone 1: Mocked Application
  {
    title: '[EPIC] M1: Mocked Application Update',
    body: `## 🎯 Objective
Update the current mocked application to reflect the 6 real teams and proper metadata structure while preserving all existing UI/UX.

## 📦 Scope

### ✅ In Scope (Mocked App)
- Replace 5 placeholder teams with 6 real teams
- Update team metadata structure (1-to-many GitLab mapping)
- Update developer team references
- Preserve all 7 current metrics
- Keep existing UI components unchanged

### ❌ Out of Scope
- Backend API implementation
- Real data fetching from Jira/GitLab
- Database integration
- Authentication

## 🏗️ Features
- [ ] #4 Update Teams & Metadata
- [ ] #5 Document Jira-GitLab Mappings

## ✅ Acceptance Criteria
- Dashboard displays 6 teams: BAU, LUCA, Ilana Va, Ilana App, Platform, Cashless
- All 7 metric cards render correctly
- Team performance table shows all teams
- Developer table has valid team references
- No TypeScript errors

## 🔗 Dependencies
- Vision Epic #1
- KPI Formulas #2

---

**Milestone**: M1 - Mocked Application`,
    labels: ['type:epic', 'scope:mocked', 'milestone:M1', 'priority:high']
  },

  // Feature 1: Update Teams & Metadata
  {
    title: '[FEATURE] Update Teams & Metadata Structure',
    body: `## 📋 Description
Replace the current 5 placeholder teams with 6 real teams from the Knowledge Transfer documentation and update the type system to support 1-to-many Jira-GitLab relationships.

## 🎯 User Story
As a product owner, I want the dashboard to display our actual 6 teams with proper metadata so that the application reflects our real organizational structure.

## 📦 Implementation Tasks
- [ ] #6 Replace teams in mockData.ts with 6 real teams
- [ ] #7 Extend TypeScript types for metadata
- [ ] #8 Update developer team references

## 🏢 Real Teams Configuration

### Team 1: BAU (Business as Usual)
- Jira Project: BTE
- Board ID: 244
- GitLab Projects: [48313593, 38286527, 38376559, 38119878]
- Estimation: story_points

### Team 2: LUCA Team
- Jira Project: LUCA
- Board ID: 210
- GitLab Projects: [60424150]
- Estimation: issue_count

### Team 3: Ilana Va
- Jira Project: IVA
- Board ID: 237
- GitLab Projects: [56123456]
- Estimation: story_points

### Team 4: Ilana App
- Jira Project: FD247
- Board ID: 229
- GitLab Projects: [60835113]
- Estimation: issue_count

### Team 5: Platform
- Jira Project: TAAS
- Board ID: 231
- GitLab Projects: [69864106, 48313593]
- Estimation: story_points

### Team 6: Cashless
- Jira Project: CAS
- Board ID: 245
- GitLab Projects: [71234567]
- Estimation: story_points

## ✅ Acceptance Criteria
- \`src/data/mockData.ts\` contains all 6 teams with correct names
- Dashboard renders 6 teams in performance table
- All 7 metric cards display correctly
- No console errors or warnings
- TypeScript compilation passes without errors

## 🔗 Dependencies
- Epic #3
- KPI Formulas Reference #2

---

**Epic**: M1: Mocked Application Update #3  
**Labels**: type:feature, scope:mocked, area:frontend`,
    labels: ['type:feature', 'scope:mocked', 'area:frontend', 'milestone:M1']
  },

  // Feature 2: Document Jira-GitLab Mappings
  {
    title: '[FEATURE] Document Jira-GitLab Cross-Platform Mappings',
    body: `## 📋 Description
Create a comprehensive reference issue documenting the 1-to-many Jira project to GitLab project mappings for future backend implementation.

## 🎯 Purpose
This documentation will serve as the authoritative source for cross-platform integration when implementing real API connections in future milestones.

## 📊 Jira → GitLab Mappings

### BTE (BAU Team) → 4 GitLab Projects
- Primary: 48313593
- Secondary: [38286527, 38376559, 38119878]
- **Note**: Metrics must aggregate across all 4 repositories

### LUCA → 1 GitLab Project
- Project: 60424150

### IVA (Ilana Va) → 1 GitLab Project
- Project: 56123456

### FD247 (Ilana App) → 1 GitLab Project
- Project: 60835113

### TAAS (Platform) → 2 GitLab Projects
- Projects: [69864106, 48313593]
- **Note**: Shares 48313593 with BTE team

### CAS (Cashless) → 1 GitLab Project
- Project: 71234567

## 🔧 Implementation Notes

### For Backend Integration
\`\`\`typescript
interface TeamConfig {
  id: string;
  name: string;
  jiraProject: string;
  jiraBoardId: string;
  gitlabProjectIds: number[];  // 1-to-many relationship
  estimationMetric: 'story_points' | 'issue_count';
}

// When fetching GitLab metrics, iterate over all project IDs:
async function getTeamGitLabMetrics(team: TeamConfig) {
  const metrics = [];
  for (const projectId of team.gitlabProjectIds) {
    const projectMetrics = await fetchGitLabMetrics(projectId);
    metrics.push(projectMetrics);
  }
  return aggregateMetrics(metrics);
}
\`\`\`

## ✅ Acceptance Criteria
- Complete mapping documented in this issue
- Cross-referenced from Vision Epic #1
- Ready for use in M3 (Integrations) milestone

## 🔗 Dependencies
- Vision Epic #1
- Future: Backend Foundation #9

---

**Epic**: M1: Mocked Application Update #3  
**Labels**: type:feature, scope:reference`,
    labels: ['type:feature', 'scope:reference', 'area:documentation', 'milestone:M1']
  },

  // Task 1: Replace teams in mockData
  {
    title: '[TASK] Replace teams with 6 real teams in mockData.ts',
    body: `## 📝 Task Description
Update \`src/data/mockData.ts\` to replace the current 5 placeholder teams with the 6 real teams.

## 🔧 Changes Required

### Current Teams (Remove)
- Toolfi MX
- Luca V2
- ilana App
- ilana Va
- Station Core

### New Teams (Add)
1. **BAU (Business as Usual)**
2. **LUCA Team**
3. **Ilana Va**
4. **Ilana App**
5. **Platform**
6. **Cashless**

## 📊 Mock Data Structure
Keep the same metric structure for each team:
\`\`\`typescript
{
  name: "BAU (Business as Usual)",
  cycleTime: 6.8,      // days
  deployments: 18.2,    // per week
  productivity: 92,     // %
  quality: 8.9,         // /10
  deviation: 8,         // %
  errors: 2.1,          // %
  score: 9.2            // /10
}
\`\`\`

## ✅ Acceptance Criteria
- [ ] \`teamsData\` array contains exactly 6 teams
- [ ] Team names match exactly: "BAU (Business as Usual)", "LUCA Team", "Ilana Va", "Ilana App", "Platform", "Cashless"
- [ ] All teams have realistic mock values for all 7 metrics
- [ ] Dashboard renders correctly with 6 teams
- [ ] No TypeScript errors

## 🧪 Testing
1. Run \`npm run dev\`
2. Verify dashboard shows 6 teams
3. Check team performance table displays all teams
4. Verify no console errors

## 🔗 Related
- Feature #4
- Epic #3

---

**Files to modify**: \`src/data/mockData.ts\``,
    labels: ['type:task', 'scope:mocked', 'area:frontend', 'milestone:M1']
  },

  // Task 2: Extend types for metadata
  {
    title: '[TASK] Extend TypeScript types to support team metadata',
    body: `## 📝 Task Description
Update \`src/types/dashboard.ts\` to include team metadata that supports 1-to-many Jira-GitLab relationships.

## 🔧 Type Changes

### Add to TeamMetrics interface:
\`\`\`typescript
export interface TeamMetrics {
  name: string;
  cycleTime: number;
  deployments: number;
  productivity: number;
  quality: number;
  deviation: number;
  errors: number;
  score: number;
  
  // New metadata fields:
  metadata?: {
    jiraProject: string;           // e.g., "BTE"
    jiraBoardId: string;           // e.g., "244"
    gitlabProjectIds: number[];    // e.g., [48313593, 38286527, ...]
    estimationMetric: 'story_points' | 'issue_count';
  };
}
\`\`\`

## ✅ Acceptance Criteria
- [ ] TeamMetrics interface includes optional metadata field
- [ ] Metadata supports array of GitLab project IDs (1-to-many)
- [ ] Includes jiraProject, jiraBoardId, and estimationMetric
- [ ] TypeScript compilation succeeds with no errors
- [ ] Existing code still works (metadata is optional)

## 🧪 Testing
1. Run \`npm run build\` - should succeed
2. Verify no TypeScript errors in IDE
3. Confirm existing components still render

## 🔗 Related
- Feature #4
- Epic #3
- Mapping Reference #5

---

**Files to modify**: \`src/types/dashboard.ts\``,
    labels: ['type:task', 'scope:mocked', 'area:frontend', 'milestone:M1']
  },

  // Task 3: Update developer team references
  {
    title: '[TASK] Update developer team references to match new team names',
    body: `## 📝 Task Description
Update the \`developersData\` array in \`src/data/mockData.ts\` to reference the correct team names after the team update.

## 🔧 Changes Required

### Current Developer-Team Assignments (Update)
- Carlos M. → ~~Toolfi MX~~ → **BAU (Business as Usual)**
- Ana L. → ~~Luca V2~~ → **LUCA Team**
- Miguel R. → ~~ilana App~~ → **Ilana App**
- Sofia P. → ~~ilana Va~~ → **Ilana Va**
- Diego C. → ~~Station Core~~ → **Platform**

### Add New Developer
- Add one developer for the 6th team (Cashless)

## 📊 Example Developer Object
\`\`\`typescript
{
  name: "Elena R.",
  team: "Cashless",
  commits: 11.5,
  prs: 8.0,
  reviews: 14.2,
  bugsResolved: 20,
  score: 9.0
}
\`\`\`

## ✅ Acceptance Criteria
- [ ] All 5 existing developers updated with correct team names
- [ ] 1 new developer added for Cashless team
- [ ] Total of 6 developers (one per team)
- [ ] Developer table renders without errors
- [ ] Team lookups work correctly in individual view

## 🧪 Testing
1. Navigate to "Individual" view
2. Verify all developers show correct team names
3. Verify "Top Performers" section displays correctly
4. Check no console errors

## 🔗 Related
- Feature #4
- Task #6
- Epic #3

---

**Files to modify**: \`src/data/mockData.ts\``,
    labels: ['type:task', 'scope:mocked', 'area:frontend', 'milestone:M1']
  },

  // Future Epics (Placeholders)
  {
    title: '[EPIC] M2: Backend Foundation',
    body: `## 🎯 Objective
Establish backend infrastructure with shared schemas, storage interfaces, and API routes.

## 📦 Scope
- Create \`shared/schema.ts\` with Team and KPI models
- Implement storage interface (IStorage) with CRUD operations
- Set up API routes (\`/api/teams\`, \`/api/kpis\`, \`/api/config\`)
- Add Zod validation for all endpoints

## 🏗️ Architecture
- Use Drizzle ORM for PostgreSQL
- MemStorage for development, PostgreSQL for production
- Type-safe schemas using \`createInsertSchema\` from drizzle-zod

## ✅ Acceptance Criteria
- Shared schema defines all data models
- Storage interface stubs all CRUD operations
- API routes respond with proper validation
- Backend compiles without errors

## 🔗 Dependencies
- M1 completion
- Vision Epic #1

---

**Milestone**: M2 - Backend Foundation  
**Status**: Future`,
    labels: ['type:epic', 'scope:production', 'milestone:M2', 'status:future']
  },

  {
    title: '[EPIC] M3: Jira & GitLab Integrations',
    body: `## 🎯 Objective
Implement real-time data collection from Jira and GitLab APIs with protection system and scheduler.

## 📦 Scope

### Jira Integration
- Cycle/Lead time collection
- Sprint predictability calculation
- Bug metrics extraction
- Release versions API

### GitLab Integration
- Deployment frequency tracking
- Merge request metrics
- Pipeline success rate
- Code coverage parsing

### Infrastructure
- 30-minute automated scheduler
- 5-second stagger between teams
- Protection system for demo stability
- Rate limiting and retry logic

## ✅ Acceptance Criteria
- All metrics collected from real APIs
- Protection system preserves last-known-good values
- Scheduler runs reliably every 30 minutes
- Rate limits respected (Jira: 60/min, GitLab: 300/min)

## 🔗 Dependencies
- M2 completion
- Jira/GitLab credentials configured
- KPI Formulas #2

---

**Milestone**: M3 - Integrations  
**Status**: Future`,
    labels: ['type:epic', 'scope:production', 'milestone:M3', 'status:future']
  },

  {
    title: '[EPIC] M4: Release Analytics',
    body: `## 🎯 Objective
Implement comprehensive release-based metrics and analytics using Jira versions API and JQL queries.

## 📦 Scope

### Core Release Metrics
- **release_size**: Story points/tickets per release
- **actual_development_days**: First "In Progress" → Resolution
- **implementation_date**: Actual vs planned date variance
- **cab_time_days**: CAB approval duration
- **on_time_delivery**: Schedule adherence
- **delay_days**: Schedule variance
- **ticket_type_distribution**: Stories/bugs/tasks breakdown
- **quality_index**: Bugs-to-features ratio

### Data Sources
- \`GET /rest/api/3/project/{KEY}/versions\` for release list
- JQL: \`project={KEY} AND fixVersion={VERSION}\` for ticket analysis
- CAB tickets with URL field linking to releases

## 🔧 Implementation Strategy
\`\`\`typescript
// Step 1: Get all versions for a project
GET https://finvivir.atlassian.net/rest/api/3/project/IVA/versions

// Step 2: For each version, get tickets
JQL: project=IVA AND fixVersion="Release 2.3.0"

// Step 3: Analyze tickets for metrics
- Calculate story points sum (release_size)
- Find first/last dates (actual_development_days)
- Compare planned vs actual dates (on_time_delivery, delay_days)
- Count ticket types (ticket_type_distribution)
- Calculate bug ratio (quality_index)
\`\`\`

## ✅ Acceptance Criteria
- All 8 release metrics calculated correctly
- Release health dashboard implemented
- Historical trend analysis available
- CAB correlation working

## 🔗 Dependencies
- M3 completion
- Jira API integration working
- KPI Formulas #2

---

**Milestone**: M4 - Release Analytics  
**Status**: Future`,
    labels: ['type:epic', 'scope:production', 'milestone:M4', 'status:future']
  },

  {
    title: '[EPIC] M5: Production Readiness',
    body: `## 🎯 Objective
Prepare system for production deployment with monitoring, alerts, and performance optimization.

## 📦 Scope

### Enterprise Aggregations
- Release Frequency (enterprise level)
- Releases This PI (enterprise level)
- Domain averages across teams
- Train health score

### Production Features
- Alert generation system
- Action item tracking
- Health check endpoints
- Performance monitoring
- Error tracking and logging

### Optimization
- Database indexing strategy
- Query performance tuning
- Caching layer implementation
- API response optimization

## ✅ Acceptance Criteria
- Enterprise metrics calculated correctly
- Alerts fire within 5 minutes of threshold breach
- All endpoints respond < 500ms
- Health checks operational
- Production deployment successful

## 🔗 Dependencies
- M4 completion
- All integrations stable
- Protection system validated

---

**Milestone**: M5 - Production  
**Status**: Future`,
    labels: ['type:epic', 'scope:production', 'milestone:M5', 'status:future']
  }
];

async function createIssues() {
  console.log('🚀 Creating GitHub issues for Station MIS Implementation Plan...\n');

  try {
    const createdIssues: number[] = [];

    for (let i = 0; i < issues.length; i++) {
      const issue = issues[i];
      console.log(`📝 Creating issue ${i + 1}/${issues.length}: ${issue.title}`);

      const response = await octokit.issues.create({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        title: issue.title,
        body: issue.body,
        labels: issue.labels
      });

      createdIssues.push(response.data.number);
      console.log(`   ✅ Created issue #${response.data.number}`);

      // Rate limiting: wait 500ms between requests
      if (i < issues.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }

    console.log('\n✨ Successfully created all issues!');
    console.log(`\n📊 Summary:`);
    console.log(`   - Total issues created: ${createdIssues.length}`);
    console.log(`   - Repository: ${REPO_OWNER}/${REPO_NAME}`);
    console.log(`   - Issues: #${createdIssues.join(', #')}`);
    console.log(`\n🔗 View issues: https://github.com/${REPO_OWNER}/${REPO_NAME}/issues`);

  } catch (error: any) {
    console.error('❌ Error creating issues:', error.message);
    if (error.response) {
      console.error('   Response:', error.response.data);
    }
    process.exit(1);
  }
}

createIssues();
