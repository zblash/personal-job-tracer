import { ApiCallService, ApiCall } from './ApiCall';

export function getPriorities() {
  return ApiCallService.request(new (ApiCall as any)().setUrl('/priorities').get());
}
