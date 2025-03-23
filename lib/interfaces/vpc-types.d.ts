export interface VpcConfig {
    readonly vpcCidr: string;
    readonly vpcName: string;
    readonly enableDnsHostnames?: boolean;
    readonly enableDnsSupport?: boolean;
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
