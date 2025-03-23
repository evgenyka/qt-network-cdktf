import { Construct } from 'constructs';
import { Vpc } from '@cdktf/provider-aws/lib/vpc';
import { VpcConfig } from '../interfaces/vpc-types';
export declare class QTVpcConstruct extends Construct {
    readonly vpc: Vpc;
    readonly vpcId: string;
    constructor(scope: Construct, name: string, config: VpcConfig);
    private generateTags;
}
