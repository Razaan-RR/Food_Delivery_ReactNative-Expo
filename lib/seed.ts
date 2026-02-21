import { ID } from 'react-native-appwrite'
import { appwriteConfig, databases } from './appwrite'
import dummyData from './data'

interface Category {
  name: string
  description: string
}

interface Customization {
  name: string
  price: number
  type: 'topping' | 'side' | 'size' | 'crust' | string
}

interface MenuItem {
  name: string
  description: string
  image_url: string
  price: number
  rating: number
  calories: number
  protein: number
  category_name: string
  customizations: string[]
}

interface DummyData {
  categories: Category[]
  customizations: Customization[]
  menu: MenuItem[]
}

const data = dummyData as DummyData

async function clearAll(collectionId: string) {
  const list = await databases.listDocuments(
    appwriteConfig.databaseId,
    collectionId,
  )
  await Promise.all(
    list.documents.map((doc) =>
      databases.deleteDocument(
        appwriteConfig.databaseId,
        collectionId,
        doc.$id,
      ),
    ),
  )
}

async function seed() {
  await clearAll(appwriteConfig.categoriesCollectionId)
  await clearAll(appwriteConfig.customizationsCollectionId)
  await clearAll(appwriteConfig.menuCollectionId)
  await clearAll(appwriteConfig.menuCustomizationsCollectionId)

  const categoryMap: Record<string, string> = {}
  for (const cat of data.categories) {
    const doc = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.categoriesCollectionId,
      ID.unique(),
      cat,
    )
    categoryMap[cat.name] = doc.$id
  }

  const customizationMap: Record<string, string> = {}
  for (const cus of data.customizations) {
    const doc = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.customizationsCollectionId,
      ID.unique(),
      cus,
    )
    customizationMap[cus.name] = doc.$id
  }

  for (const item of data.menu) {
    const doc = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.menuCollectionId,
      ID.unique(),
      {
        name: item.name,
        description: item.description,
        image_url: item.image_url,
        price: item.price,
        rating: item.rating,
        calories: item.calories,
        protein: item.protein,
        categories: categoryMap[item.category_name],
      },
    )

    for (const cusName of item.customizations) {
      await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.menuCustomizationsCollectionId,
        ID.unique(),
        {
          menu: doc.$id,
          customizations: customizationMap[cusName],
        },
      )
    }
  }

  console.log('✅ Seeding complete.')
}

export default seed
