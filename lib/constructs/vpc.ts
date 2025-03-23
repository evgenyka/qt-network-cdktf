// src/constructs/vpc.ts
import { Construct } from 'constructs';
import { Vpc } from '@cdktf/provider-aws/lib/vpc';
import { VpcConfig } from '../interfaces/vpc-types';

export class QTVpcConstruct extends Construct {
  public readonly vpc: Vpc;
  public readonly vpcId: string;

  constructor(scope: Construct, name: string, config: VpcConfig) {
    super(scope, name);

    this.vpc = new Vpc(this, 'vpc', {
      cidrBlock: config.vpcCidr,
      enableDnsHostnames: config.enableDnsHostnames ?? true,
      enableDnsSupport: config.enableDnsSupport ?? true,
      tags: this.generateTags(config),
    });

    this.vpcId = this.vpc.id;
  }

  private generateTags(config: VpcConfig): { [key: string]: string } {
    return {
      Name: config.vpcName,
      ...config.tags,
      ...(config.sourceMetadata && {
        SourceType: config.sourceMetadata.sourceType,
        SourceName: config.sourceMetadata.sourceName,
        MigrationDate: config.sourceMetadata.migrationDate,
      }),
    };
  }
}
