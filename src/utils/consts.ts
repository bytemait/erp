export const env = {
    microsoft: {
        clientId: process.env.AUTH_MICROSOFT_ENTRAID_CLIENT_ID,
        clientSecret: process.env.AUTH_MICROSOFT_ENTRAID_CLIENT_SECRET,
        issuer: process.env.AUTH_MICROSOFT_ENTRAID_ISSUER,
    },
    dbUri: process.env.DB_URI,
    saltRounds: Number(process.env.BCRYPT_SALT_ROUNDS),
    adminSeed: {
        email: process.env.ADMIN_SEED_EMAIL,
        password: process.env.ADMIN_SEED_PASSWORD,
    },
    nextAuthSecret: process.env.AUTH_SECRET,
};

export const bloodGroup = {
    A_POSITIVE: "A+",
    A_NEGATIVE: "A-",
    B_POSITIVE: "B+",
    B_NEGATIVE: "B-",
    AB_POSITIVE: "AB+",
    AB_NEGATIVE: "AB-",
    O_POSITIVE: "O+",
    O_NEGATIVE: "O-",
};

export const gender = {
    MALE: "Male",
    FEMALE: "Female",
    OTHERS: "Others",
};

export const region = {
    DELHI: "Delhi",
    OUTSIDE_DELHI: "Outside Delhi",
};

export const category = {
    SC: "Scheduled Caste",
    ST: "Scheduled Tribe",
    OBC: "Other Backward Class",
    GEN: "General",
    EWS: "Economically Weaker Section",
    PH: "Persons with Disabilities",
    DEFENCE: "Defence",
    J_AND_K_MIGRANT: "Jammu and Kashmir Migrant",
};

export const role = {
    STUDENT: "STUDENT",
    FACULTY: "FACULTY",
    STAFF: "STAFF",
    ADMIN: "ADMIN",
};