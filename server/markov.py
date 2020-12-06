# rules <dict>
class Markov:
    def __init__(self, rules, max_iter=999):
        self.rules = rules
        self.max_iter = max_iter
        self.iterations = 0

    @staticmethod
    # start and end are inclusive
    def replace(string, sub, start, end):
        return string[:start] + sub + string[end+1:]

    def try_to_apply_rule(self, string, rule, value):
        start = 0
        end = len(rule)
        found = False
        halt = False
        while not found and start <= len(string) - len(rule):
            substring = string[start:end]
            if substring == rule:
                if value.startswith('.'):
                    string = self.replace(string, value[1:], start, end-1)
                    found = True
                    halt = True
                else:
                    string = self.replace(string, value, start, end-1)
                    found = True
            start += 1
            end += 1

        if found:
            return string, halt
        else:
            return None, halt

    def evaluate(self, string):
        result = string
        for rule in self.rules:
            post_rule = self.try_to_apply_rule(string, rule, self.rules[rule])
            if post_rule[1]:
                return post_rule[0]
            elif post_rule[0] is not None:
                self.iterations += 1
                if self.iterations >= self.max_iter:
                    raise RuntimeError('This evaluation is infinite')
                return self.evaluate(post_rule[0])
        self.iterations = 0
        return result





