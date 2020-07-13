export const getCollection = (snapshot: FirebaseFirestore.QuerySnapshot) => {
  const col = snapshot.docs.map(doc => {
    return { ...doc.data(), id: doc.id };
  });

  return col;
};
