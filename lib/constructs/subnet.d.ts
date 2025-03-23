import { Construct } from 'constructs';
import { Subnet } from '@cdktf/provider-aws/lib/subnet';
import { RouteTable } from '@cdktf/provider-aws/lib/route-table';
import { Route } from '@cdktf/provider-aws/lib/route';
import { SubnetConfig } from '../interfaces/subnet-types';
export declare class QTSubnetConstruct extends Construct {
    readonly subnet: Subnet;
    readonly subnetId: string;
    readonly routeTable: RouteTable;
    readonly routeTableId: string;
    constructor(scope: Construct, name: string, config: SubnetConfig);
    private generateTags;
    addRoute(destinationCidr: string, targetId: string, targetAttribute: string): Route;
}
