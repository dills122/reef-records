import {preparePolicy, PLAN} from '../../../scripts/dev/calcify-financial/rate-proof.mjs';
const h='a'.repeat(64);
const c={schema:'financial-rate-calibration-v1',sourceHead:h,fixtureSha256:h,realRecordEvidenceSha256:h,sampleTrades:1,encodedBytes:100000,physicalBytes:200000,physicalReplicationIncluded:true,identityPhysicalBytes:100,pendingPhysicalBytes:200,producer:{completedTrades:10000,elapsedMs:1000},observer:{completedTrades:10000,elapsedMs:1000,exactParity:true}};
const e={schema:'financial-e3-correctness-v1',result:'PASS',sourceHead:h,fixtureSha256:h,evidenceSha256:h};
const p={guestFreeBytes:40*1024**3,basePhysicalBytes:1024,indexedReadView:true,boundedWrites:true,retainsFullDomainHistory:false,accessPatternEvidenceSha256:h};
for(const override of [undefined,0,-1,1,'bogus',0.5,Infinity]) {
 const calibration={...c};if(override!==undefined)calibration.maxPhysicalBytesPerTrade=override;
 const r=preparePolicy({calibration,correctness:e,preflight:p,arm:PLAN.ladder[0]});
 console.log(JSON.stringify({kind:'optionalOverride',override:override??'absent',status:r.status,gaps:r.gaps,estimated:r.aged?.estimatedBytes,perTrade:r.aged?.physicalBytesPerTradeBudget,policy:r.policySha256}));
}
const valid={...c,sampleTrades:1000};
for(const field of ['sampleTrades','encodedBytes','physicalBytes','identityPhysicalBytes','pendingPhysicalBytes'])for(const bad of [0,-1,0.5,'bogus',Infinity]) {
 const r=preparePolicy({calibration:{...valid,[field]:bad},correctness:e,preflight:p,arm:PLAN.ladder[0]});
 if(r.status!=='BLOCKED')throw Error(`required calibration guard bypass ${field}=${bad}`);
}
for(const role of ['producer','observer'])for(const field of ['completedTrades','elapsedMs'])for(const bad of [0,-1,0.5,'bogus',Infinity]) {
 const r=preparePolicy({calibration:{...valid,[role]:{...valid[role],[field]:bad}},correctness:e,preflight:p,arm:PLAN.ladder[0]});
 if(r.status!=='BLOCKED')throw Error(`rate guard bypass ${role}.${field}=${bad}`);
}
for(const field of ['basePhysicalBytes','guestFreeBytes'])for(const bad of [-1,0.5,'bogus',Infinity]) {
 const r=preparePolicy({calibration:valid,correctness:e,preflight:{...p,[field]:bad},arm:PLAN.ladder[0]});
 if(r.status!=='BLOCKED')throw Error(`preflight guard bypass ${field}=${bad}`);
}
console.log(JSON.stringify({numericFamilyRequiredControls:'PASS',checks:53,fabricated:true,benchmark:false}));
