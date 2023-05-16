export const registerDto = {
    send: (data: any) => {
        return {
            username: data?.name || '-',
            password: data?.password || '-',
            email: data?.email || '',
            phone_number: data?.phoneNumber.toString() || '-',
            nationality: data?.nationality || 'nepali',
            role: data?.role || 'guide',
        };
    },
};

export const loginDto = {
    send: (data: any) => {
        return {
            username: data?.phoneNumber || data?.username || '-',
            password: data?.password || '-',
        };
    },
};

export const registerTouristDto = {
    send: (data: any) => {
        return {
            username: data?.username || '',
            phone_number: data?.phoneNumber || '',
            email: data?.email || '',
            password: data?.password || '',
            nationality: data?.nationality || '',
            role: 'tourist',
        };
    },
};
