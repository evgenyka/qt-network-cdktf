
# AWS Network Infrastructure - CDKTF Project

This project provides AWS network infrastructure using CDK for Terraform (CDKTF), generated by Amazon Q Transform.

## Prerequisites

- Node.js >= 14.x
- AWS CLI configured
- Terraform >= 1.0
- CDKTF CLI (`npm install -g cdktf-cli`)

## Project Structure

```
qt-network-cdktf/
├── main.ts                 # Main stack definition
├── lib/                    # Reusable constructs
│   ├── constructs/
│   │   ├── vpc.ts         # VPC construct
│   │   └── subnet.ts      # Subnet construct
│   └── interfaces/
│       ├── vpc-types.ts   # VPC configuration types
│       └── subnet-types.ts # Subnet configuration types
├── __test__/                   # Test files
│   └── main-test.ts
└── cdktf.json             # CDKTF configuration
```

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd qt-network-cdktf

# Install dependencies
npm install

# Get CDKTF dependencies
cdktf get
```

## Usage

### Build and Deploy

```bash
# Build TypeScript code
npm run build

# Generate Terraform configuration
cdktf synth

# Review the deployment plan
cdktf plan

# Deploy the infrastructure
cdktf deploy
```

### Destroy Infrastructure

```bash
cdktf destroy
```

## Stack Configuration

Example stack configuration in `bin/simple-network.ts`:

```typescript
const vpc = new QTVpcConstruct(this, 'vpc', {
  vpcCidr: '10.21.4.0/24',
  vpcName: 'qt-migrated-vpc',
  tags: {
    Environment: 'production',
    MigratedFrom: 'vSwitch1'
  }
});

new QTSubnetConstruct(this, 'subnet', {
  vpcId: vpc.vpcId,
  cidrBlock: '10.21.4.0/24',
  availabilityZone: 'us-west-2a',
  name: 'qt-migrated-subnet',
  subnetType: 'private'
});
```

### Available Constructs

#### VPC Construct

Creates an AWS VPC with configurable settings:

- CIDR block
- DNS support
- DNS hostnames
- Tags
- Source environment metadata

#### Subnet Construct

Creates an AWS Subnet with:

- Public/Private configuration
- Route table association
- Tags
- Source environment metadata

## Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

### Available Scripts

```bash
npm run build - Build TypeScript code
npm run synth - Generate Terraform configuration
npm run deploy - Deploy infrastructure
npm test - Run tests
npm run get - Get CDKTF dependencies
npm run upgrade - Upgrade CDKTF dependencies
```

## Project Configuration

`cdktf.json`:

```json
{
  "language": "typescript",
  "app": "npm run --silent compile && node main.js",
  "projectId": "qt-network-cdktf",
  "sendCrashReports": "false",
  "context": {
    "excludeStackIdFromLogicalIds": "true",
    "allowSepCharsInLogicalIds": "true"
  },
  "output": "cdktf.out"
}
```

## Migration Information

This project supports AWS network infrastructure migration with:

- Source environment traceability
- Metadata preservation
- Standard AWS networking patterns

## Best Practices

- Always review the plan before deployment
- Use meaningful tags for resources
- Keep source environment metadata for traceability
- Write tests for new constructs
- Follow AWS networking best practices

## Troubleshooting

### Common Issues

#### Backend configuration changes:

```bash
cdktf init --reconfigure
```

#### Dependency issues:

```bash
npm install
cdktf get
```

#### Build errors:

```bash
npm run build
```

## Support

For assistance:

- Review CDKTF documentation
- Check AWS networking documentation
- Contact AWS Support
- Refer to Amazon Q Transform documentation

## Contributing

- Fork the repository
- Create a feature branch
- Commit changes
- Create a pull request

## License

Apache License 2.0

Copyright 2025 [Your Name or Organization]

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

Generated by Amazon Q Transform
