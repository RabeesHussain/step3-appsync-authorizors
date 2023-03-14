"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = async (event) => {
    console.log(`event >`, JSON.stringify(event, null, 2));
    const { authorizationToken, } = event;
    const response = {
        isAuthorized: authorizationToken === 'custom-authorized',
        resolverContext: {
            userid: 'test-user-id',
        },
        deniedFields: [],
        ttlOverride: 1
    };
    console.log(`response >`, JSON.stringify(response, null, 2));
    return response;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBLE9BQU8sQ0FBQyxPQUFPLEdBQUksS0FBSyxFQUFDLEtBQTRCLEVBQXdDLEVBQUU7SUFDM0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDdEQsTUFBTSxFQUNGLGtCQUFrQixHQUNyQixHQUFHLEtBQUssQ0FBQTtJQUVULE1BQU0sUUFBUSxHQUFnQztRQUMxQyxZQUFZLEVBQUUsa0JBQWtCLEtBQUssbUJBQW1CO1FBQ3hELGVBQWUsRUFBRTtZQUNiLE1BQU0sRUFBRSxjQUFjO1NBQ3pCO1FBQ0QsWUFBWSxFQUFDLEVBQUU7UUFDZixXQUFXLEVBQUMsQ0FBQztLQUVoQixDQUFBO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDNUQsT0FBTyxRQUFRLENBQUE7QUFDbkIsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwU3luY1Jlc29sdmVyRXZlbnQsQXBwU3luY0F1dGhvcml6ZXJFdmVudCxBcHBTeW5jQXV0aG9yaXplclJlc3VsdCB9IGZyb20gJ2F3cy1sYW1iZGEnO1xuXG5cbmV4cG9ydHMuaGFuZGxlciA9ICBhc3luYyhldmVudDpBcHBTeW5jQXV0aG9yaXplckV2ZW50KTpQcm9taXNlPEFwcFN5bmNBdXRob3JpemVyUmVzdWx0PGFueT4+ID0+IHtcbiAgICBjb25zb2xlLmxvZyhgZXZlbnQgPmAsIEpTT04uc3RyaW5naWZ5KGV2ZW50LCBudWxsLCAyKSlcbiAgICBjb25zdCB7XG4gICAgICAgIGF1dGhvcml6YXRpb25Ub2tlbixcbiAgICB9ID0gZXZlbnRcblxuICAgIGNvbnN0IHJlc3BvbnNlOkFwcFN5bmNBdXRob3JpemVyUmVzdWx0PGFueT4gPSB7XG4gICAgICAgIGlzQXV0aG9yaXplZDogYXV0aG9yaXphdGlvblRva2VuID09PSAnY3VzdG9tLWF1dGhvcml6ZWQnLFxuICAgICAgICByZXNvbHZlckNvbnRleHQ6IHtcbiAgICAgICAgICAgIHVzZXJpZDogJ3Rlc3QtdXNlci1pZCcsXG4gICAgICAgIH0sXG4gICAgICAgIGRlbmllZEZpZWxkczpbXSxcbiAgICAgICAgdHRsT3ZlcnJpZGU6MVxuICAgICAgICBcbiAgICB9XG4gICAgY29uc29sZS5sb2coYHJlc3BvbnNlID5gLCBKU09OLnN0cmluZ2lmeShyZXNwb25zZSwgbnVsbCwgMikpXG4gICAgcmV0dXJuIHJlc3BvbnNlXG59XG5cbiJdfQ==