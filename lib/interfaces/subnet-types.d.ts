export interface SubnetConfig {
    readonly vpcId: string;
    readonly cidrBlock: string;
    readonly availabilityZone: string;
    readonly name: string;
    readonly subnetType: 'public' | 'private' | 'isolated';
    readonly mapPublicIpOnLaunch?: boolean;
    readonly tags?: {
        [key: string]: string;
    };
    readonly sourceMetadata?: {
        readonly sourceType: string;
        readonly sourceName: string;
        readonly sourceId: string;
        readonly migrationDate: string;
        readonly sourceConfigs: {
            [key: string]: string;
        };
    };
}
