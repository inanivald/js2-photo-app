import { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../firebase'
import { BounceLoader } from 'react-spinners'

const AuthContext = createContext()

const useAuth = () => {
	return useContext(AuthContext)
}


const AuthContextProvider = (props) => {
	const [currentUser, setCurrentUser] = useState(null)
	const [loading, setLoading] = useState(true)

	const signup = (email, password) => {
		return auth.createUserWithEmailAndPassword(email, password)
	}

 	const login = (email, password) => {
	 return auth.signInWithEmailAndPassword(email, password)
	}

	const logout = () => {
		return auth.signOut()
	}

	const reset = (email) => {
		return auth.sendPasswordResetEmail(email)
	}

	const updatePassword = (password) => {
		return currentUser.updatePassword(password)
	}
	
	const updateProfile = (name) => {
		return currentUser.updateProfile({
			displayName: name
		})
	}

	const updateEmail = (email) => {
		return currentUser.updateEmail(email)
	}


	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(user => {
			setCurrentUser(user)
			setLoading(false)
		})

		return unsubscribe
	}, [])

	const contextValues = {
		currentUser,
		loading,
		signup,
		login,
		logout,
		reset,
		updateProfile,
		updatePassword,
		updateEmail,
	}

	return (
		<AuthContext.Provider value={contextValues}>
			{loading && (<div className="d-flex justify-content-center my-5"><BounceLoader color={"#888"} size={100} /></div>)}
			{!loading && props.children}
		</AuthContext.Provider>
	)
}

export { AuthContext, useAuth, AuthContextProvider as default }
