import { Module } from "@nestjs/common";
import { FileService } from "./file.service";
import { LocalStorage } from "./storages/local/local.storage";


@Module({
    providers: []
})
export class LocalStorageModule {
    static forRoot(args: { buckets: string[], localFolder: string }) {
        const { buckets = ['avatars', 'photos', 'videos'], localFolder = 'public' } = args

        return {
            providers: [{
                provide: 'LOCAL_STORAGE_SERVICE',
                useValue: buckets.reduce((res, item) => {
                    res[item] = new FileService({ storage: new LocalStorage({ localFolder: 'public' }), bucket: item })
                    return res as { [k: typeof item]: FileService }
                }, {})
            }]
        }
    }
}