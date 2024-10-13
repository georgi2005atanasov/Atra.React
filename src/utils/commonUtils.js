import * as os from 'os';

export const getDeviceData = () => ({
    os: os.type(),
    osVersion: os.release(),
    macAddress: getMacAddress(),
    machineName: os.hostname(),
});

const getMacAddress = () => {
    const networkInterfaces = os.networkInterfaces();
    let macAddress = null;

    for (const [name, interfaces] of Object.entries(networkInterfaces)) {
        for (const iface of interfaces) {
            if (!iface.internal && iface.mac !== '00:00:00:00:00:00') {
                macAddress = iface.mac;
                break;
            }
        }
        if (macAddress) {
            break;
        }
    }

    return macAddress || "unknown";
};

export const getSignatureData = () => {
    
}