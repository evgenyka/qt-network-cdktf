import { Construct } from "constructs";
import { App, TerraformStack } from "cdktf";
import { provider } from '@cdktf/provider-aws';
import { QTVpcConstruct } from './lib/constructs/vpc';
import { QTSubnetConstruct } from './lib/constructs/subnet';


class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    // define resources here
    new provider.AwsProvider(this, 'AWS', {
        region: 'us-west-2',
      });

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
  }
}

const app = new App();
new MyStack(app, "qt-network-cdktf");
app.synth();
