import User from "../models/User";
import Company from "../models/Company";
import Certificate from "../models/Certificate";

const resolvers = {
  Query: {
    allUsers: async (parent, args, { User }) => {
      const users = await User.find();
      return users.map(x => {
        x._id = x._id.toString();
        return x;
      });
    },
    allUsersFromCompany: async (parent, args, { User }) => {
      const users = await User.find(args);
      return users.map(x => {
        x._id = x._id.toString();
        return x;
      });
    },
    allCertificatesFromCompany: async (parent, args, { Certificate }) => {
      const certificates = await Certificate.find(args);
      return certificates.map(x => {
        x._id = x._id.toString();
        return x;
      });
    },
    allCompanies: async (parent, args, { Company }) => {
      const companies = await Company.find();
      return companies.map(x => {
        x._id = x._id.toString();
        return x;
      });
    },
    allCertificates: async (parent, args, { Certificate }) => {
      const certificate = await Certificate.find();
      return certificate.map(x => {
        x._id = x._id.toString();
        return x;
      });
    },
    getUserCompany: async (parent, args, { Company }) => {
      console.log(args);
      return Company.find(args);
    },
    getCompanyById: async (parent, args, { Company }) => {
      console.log(args);
      return Company.find(args);
    },
    getUserById: async (parent, args, { User }) => {
      console.log(args);
      return User.find(args);
    },
    getCertificateById: async (parent, args, { Certificate }) => {
      console.log(args);
      return Certificate.find(args);
    },
    getCertificateByHash: async (parent, args, { Certificate }) => {
      console.log(args);
      const certificates = await Certificate.find(args);
      return certificates.map(x => {
        x._id = x._id.toString();
        return x;
      });
    },
    getCertificateByUserId: async (parent, args, { Certificate }) => {
      console.log(args);
      const certificates = await Certificate.find(args);
      return certificates.map(x => {
        x._id = x._id.toString();
        return x;
      });
    }

  },
  Mutation: {
    createCompany: async (parent, args, { Company }) => {
      const company = await new Company(args).save();
      company._id = company._id.toString();
      console.log(args);
      return company;
    },
    createUser: async (parent, args, { User }) => {
      const user = await new User(args).save();
      user._id = user._id.toString();
      console.log(args);
      return user;
    },
    createCertificate: async (parent, args, { Certificate }) => {
      const certificate = await new Certificate(args).save();
      certificate._id = certificate._id.toString();
      console.log(args);
      return certificate;
    }
  }
};

export default resolvers;
