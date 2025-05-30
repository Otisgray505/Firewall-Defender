"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { initializeDatabase } from "../actions/init-database"

export default function AdminPage() {
  const [isInitializing, setIsInitializing] = useState(false)
  const [result, setResult] = useState<{ success?: boolean; message?: string; error?: string } | null>(null)

  const handleInitializeDatabase = async () => {
    setIsInitializing(true)
    setResult(null)

    try {
      const result = await initializeDatabase()
      setResult(result)
    } catch (error) {
      setResult({ success: false, error: error.message })
    } finally {
      setIsInitializing(false)
    }
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Database Initialization</CardTitle>
            <CardDescription>
              Initialize the database with sample data for destinations, flights, aircraft, seats, and in-flight
              services.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              This action will create or update all necessary tables and populate them with sample data. It's safe to
              run multiple times as it will not duplicate data.
            </p>

            {result && (
              <Alert className={result.success ? "bg-green-50" : "bg-red-50"}>
                {result.success ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-red-600" />
                )}
                <AlertTitle>{result.success ? "Success" : "Error"}</AlertTitle>
                <AlertDescription>
                  {result.message ||
                    result.error ||
                    (result.success ? "Database initialized successfully" : "Failed to initialize database")}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleInitializeDatabase}
              disabled={isInitializing}
              className="bg-primaryBlue hover:bg-secondaryBlue"
            >
              {isInitializing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isInitializing ? "Initializing..." : "Initialize Database"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
