// lib/constructs/subnet.ts
import { Construct } from 'constructs';
import { Subnet } from '@cdktf/provider-aws/lib/subnet';
import { RouteTable } from '@cdktf/provider-aws/lib/route-table';
import { Route } from '@cdktf/provider-aws/lib/route';
import { RouteTableAssociation } from '@cdktf/provider-aws/lib/route-table-association';
import { SubnetConfig } from '../interfaces/subnet-types';

export class QTSubnetConstruct extends Construct {
  public readonly subnet: Subnet;
  public readonly subnetId: string;
  public readonly routeTable: RouteTable;
  public readonly routeTableId: string;

  constructor(scope: Construct, name: string, config: SubnetConfig) {
    super(scope, name);

    // Create subnet
    this.subnet = new Subnet(this, 'subnet', {
      vpcId: config.vpcId,
      cidrBlock: config.cidrBlock,
      availabilityZone: config.availabilityZone,
      mapPublicIpOnLaunch: config.mapPublicIpOnLaunch ?? (config.subnetType === 'public'),
      tags: this.generateTags(config),
    });

    this.subnetId = this.subnet.id;

    // Create route table
    this.routeTable = new RouteTable(this, 'route-table', {
      vpcId: config.vpcId,
      tags: {
        Name: `${config.name}-rt`,
        ...config.tags,
      },
    });

    this.routeTableId = this.routeTable.id;

    // Associate route table with subnet
    new RouteTableAssociation(this, 'route-table-association', {
      subnetId: this.subnetId,
      routeTableId: this.routeTableId,
    });
  }

  private generateTags(config: SubnetConfig): { [key: string]: string } {
    return {
      Name: config.name,
      SubnetType: config.subnetType,
      ...config.tags,
      ...(config.sourceMetadata && {
        SourceType: config.sourceMetadata.sourceType,
        SourceName: config.sourceMetadata.sourceName,
        MigrationDate: config.sourceMetadata.migrationDate,
      }),
    };
  }

  // Helper method to add routes to the route table
  public addRoute(destinationCidr: string, targetId: string, targetAttribute: string) {
    const routeConfig: any = {
      routeTableId: this.routeTableId,
      destinationCidrBlock: destinationCidr,
    };
    routeConfig[targetAttribute] = targetId;

    return new Route(this, `route-${destinationCidr}`, routeConfig);
  }
}
