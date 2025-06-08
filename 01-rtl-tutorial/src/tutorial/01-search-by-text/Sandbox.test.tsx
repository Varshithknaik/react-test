import { render, screen } from "@testing-library/react"
import SandBox from "./Sandbox"

describe("01-search-by-text" , () => {

  test('demonstrates different query methods' , async () => {

    render(<SandBox />)

    //1. getByText
    // const heading = screen.getByText('React Testing Library Examples')
    // expect(heading).toBeInTheDocument()

    expect(screen.getByText(/React Testing Library Examples/i)).toBeInTheDocument()

    const phoneRegex = /\d{3}-\d{3}-\d{4}/

    const phoneText = screen.getByText(phoneRegex);
    expect(phoneText).toBeInTheDocument()

    const errorMessage= screen.queryByText(/Error message/i)
    expect(errorMessage).not.toBeInTheDocument()

    // const items = screen.getByText('Item 1')
    const items  = screen.getAllByText('Item 1')
    expect(items).toHaveLength(3)

    const asyncMessage = await screen.findByText('Async message')
    expect(asyncMessage).toBeInTheDocument()
  })
})
