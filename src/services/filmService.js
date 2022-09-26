import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getDocsFromServer,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";

export const addMovie = async (movie) => {
  return new Promise((resolve, reject) => {
    try {
      setDoc(doc(db, "movies", movie.id), {
        title: movie.title,
        origins: movie.origins,
        actors: movie.actors,
        realisation: movie.realisation,
        releaseDate: movie.releaseDate,
        description: movie.description,
        period: movie.period,
        scenarist: movie.scenarist,
        language: movie.language,
        selectedCategories: movie.selectedCategories,
      });
      resolve("success");
    } catch (err) {
      reject(err.message);
    }
  });
};

export const verifTitle = async (title) => {
  return new Promise(async (resolve, reject) => {
    const q = query(collection(db, "movies"), where("title", "==", title));

    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      resolve("success");
    }
    reject("movie exist");
  });
};

export const searchForMovie = (title) => {
  return new Promise(async (resolve, reject) => {
    const q = query(collection(db, "movies"), where("title", "==", title));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs.at(0);
      resolve({
        id: doc.id,
        language: doc.data()["language"],
        actors: doc.data()["actors"],
        description: doc.data()["description"],
        origins: doc.data()["origins"],
        period: doc.data()["period"],
        realisation: doc.data()["realisation"],
        scenarist: doc.data()["scenarist"],
        releaseDate: doc.data()["releaseDate"],
        selectedCategories: doc.data()["selectedCategories"],
        title: doc.data()["title"],
      });
    }

    reject("no result");
  });
};

export const getMoviesOfActor = (name) => {
  return new Promise(async (resolve, reject) => {
    const q = query(
      collection(db, "movies"),
      where("actors", "array-contains", name)
    );
    const querySnapshot = await getDocs(q);
    let res = [];
    if (!querySnapshot.empty) {
      querySnapshot.docs.forEach((doc) => {
        res.push({
          id: doc.id,
          language: doc.data()["language"],
          actors: doc.data()["actors"],
          description: doc.data()["description"],
          origins: doc.data()["origins"],
          period: doc.data()["period"],
          realisation: doc.data()["realisation"],
          scenarist: doc.data()["scenarist"],
          releaseDate: doc.data()["releaseDate"],
          selectedCategories: doc.data()["selectedCategories"],
          title: doc.data()["title"],
        });
      });
      resolve(res);
    }
    reject("no result");
  });
};

export const getAllMovies = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const listOfMovies = [];
      const q = query(collection(db, "movies"));

      const querySnapshot = await getDocsFromServer(q).catch((err) => {
        reject(err);
      });
      querySnapshot.docs.forEach((doc) => {
        listOfMovies.push({
          id: doc.id,
          language: doc.data()["language"],
          actors: doc.data()["actors"],
          description: doc.data()["description"],
          origins: doc.data()["origins"],
          period: doc.data()["period"],
          realisation: doc.data()["realisation"],
          scenarist: doc.data()["scenarist"],
          releaseDate: doc.data()["releaseDate"],
          selectedCategories: doc.data()["selectedCategories"],
          title: doc.data()["title"],
        });
      });
      resolve(listOfMovies);
    } catch (error) {
      reject(error.message);
    }
  });
};

export const getAllProposals = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const listOfPropsals = [];
      const q = query(collection(db, "proposals"));

      const querySnapshot = await getDocsFromServer(q).catch((err) => {
        reject(err);
      });
      querySnapshot.docs.forEach((doc) => {
        listOfPropsals.push({
          id: doc.id,
          actor: doc.data()["actorName"],
          movies: doc.data()["movies"],
          username: doc.data()["username"],
        });
      });
      console.log(listOfPropsals);
      resolve(listOfPropsals);
    } catch (error) {
      reject(error.message);
    }
  });
};

export const deleteProposal = async (id) => {
  return new Promise(async (res, rej) => {
    try {
      await deleteDoc(doc(db, "proposal", id));
      res("success");
    } catch (error) {
      rej(error);
    }
  });
};
