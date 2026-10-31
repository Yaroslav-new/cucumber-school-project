Feature: Hear shout
  Shouty allows users to "hear" other users "shouts" as long as they are close enough to each other.

  Rule: Shouts can be heard by other users

    @smoke
    Scenario: Listener hears a message
      Given a person named Sean
      And a person named Lucy
      When Sean shouts "free bagels at Sean's"
      Then Lucy should hear Sean's message

    Scenario: Shouter does not hear their own shout
      Given a person named Sean
      And a person named Lucy
      When Sean shouts
      Then Sean should not hear a shout

  Rule: Shouts should only be heard if listener is within range

    @smoke
    Scenario: Listener is within range
      Given the range is 100
      And people are located at
        | name     | location |
        | Sean     | 0        |
        | Lucy     | 50       |
      When Sean shouts
      Then Lucy should hear a shout

    Scenario: Listener is out of range
      Given the range is 100
      And people are located at
        | name     | location |
        | Sean     | 0        |
        | Larry    | 150      |
      When Sean shouts
      Then Larry should not hear a shout

    Scenario: Range is changed after people are created
      Given a person named Sean
      And a person named Lucy
      And the range is 10
      And people are located at
        | name     | location |
        | Lucy     | 5        |
      When Sean shouts
      Then Lucy should hear a shout

    Scenario Outline: Listener at the edge of the range
      Given the range is 100
      And people are located at
        | name     | location   |
        | Sean     | 0          |
        | Lucy     | <location> |
      When Sean shouts
      Then Lucy <result>

      Examples:
        | location | result                  |
        | 100      | should hear a shout     |
        | 101      | should not hear a shout |

  Rule: Listener should be able to hear multiple shouts

    Scenario: Two shouts
      Given a person named Sean
      And a person named Lucy
      When Sean shouts "Free bagels!"
      And Sean shouts "Free toast!"
      Then Lucy hears the following messages:
        | Free bagels! |
        | Free toast!  |

  Rule: Maximum length of message is 180 characters

    Scenario Outline: Message length limit
      Given a person named Sean
      And a person named Lucy
      When Sean shouts a message of <length> characters
      Then Lucy <result>

      Examples:
        | length | result                  |
        | 180    | should hear a shout     |
        | 181    | should not hear a shout |

    Scenario: Message is too long
      Given a person named Sean
      And a person named Lucy
      When Sean shouts the following message
        """
        This is a really long message
        so long in fact that I am not going to
        be allowed to send it, at least if I keep
        typing like this until the length is over
        the limit of 180 characters. And just to be
        sure, here is one more line of text.
        """
      Then Lucy should not hear a shout
